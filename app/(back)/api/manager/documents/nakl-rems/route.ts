import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/(back)/api/auth/[...nextauth]/options';
import Model__NakladnayaRems from '@/lib/mongoose/models/manager/documents/Model__NakladnayaRems';

import Model__Contract from '@/lib/mongoose/models/manager/refdata/Model__Contract';
import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';

import Model__Product from '@/lib/mongoose/models/manager/refdata/Model__Product';
import Model__Unit from '@/lib/mongoose/models/manager/refdata/Model__Unit';
import Model__FirmType from '@/lib/mongoose/models/accountant/refData/Model__FirmType';
import Model__TaxationType from '@/lib/mongoose/models/accountant/refData/Model__TaxationType';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
  const {
    nakladnayaRemsNumber1,
    nakladnayaRemsNumber2,
    nakladnayaRemsNumber3,

    nakladnayaRemsDate,
    contract,

    executorFirm1,
    executorFirm2,
    executorFirm3,
    clientFirm,
    ourFirm,

    percent2,
    percent3,
    totalRemsNaklSumToShow,

    products,
  } = await request.json();
  if (
    !nakladnayaRemsNumber1 ||
    !nakladnayaRemsNumber2 ||
    !nakladnayaRemsNumber3 ||
    !contract ||
    !executorFirm1 ||
    !executorFirm2 ||
    !executorFirm3 ||
    !clientFirm ||
    !ourFirm ||
    !totalRemsNaklSumToShow ||
    !products ||
    (products && products.length === 0)
  ) {
    return new NextResponse(
      JSON.stringify({
        message: 'Please add all fields ',
      }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    // Check if already exists
    const already__Exists = await Model__NakladnayaRems.findOne({
      contract,
    });

    if (already__Exists) {
      return new NextResponse(
        JSON.stringify({
          message: 'This item already exists',
        }),
        {
          status: 400,
        }
      );
    }
    const session = await getServerSession(authOptions);

    const new__ITEM = await Model__NakladnayaRems.create({
      nakladnayaRemsNumber1,
      nakladnayaRemsNumber2,
      nakladnayaRemsNumber3,

      nakladnayaRemsDate,
      contract,

      executorFirm1,
      executorFirm2,
      executorFirm3,
      clientFirm,
      ourFirm,

      percent2,
      percent3,
      totalRemsNaklSumToShow,

      products,

      creator: session?.user._id,
    });

    if (!new__ITEM) {
      return new NextResponse(
        JSON.stringify({
          message: 'Не удалось создать накладную',
        }),
        {
          status: 400,
        }
      );
    }

    const responseObj = {
      message: 'Добавлено успешно',
      my_data: new__ITEM,
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') ?? '0');
  const pageSize = parseInt(url.searchParams.get('limit') ?? '0');
  const skip = (page - 1) * pageSize;

  const filterSTR = url.searchParams.get('filter') ?? '';

  const contract = url.searchParams.get('contract') ?? '';
  const executorFirm1 = url.searchParams.get('executorFirm1') ?? '';
  const executorFirm2 = url.searchParams.get('executorFirm2') ?? '';
  const executorFirm3 = url.searchParams.get('executorFirm3') ?? '';
  const clientFirm = url.searchParams.get('clientFirm') ?? '';
  const ourFirm = url.searchParams.get('ourFirm') ?? '';

  const naklDateStart = url.searchParams.get('naklDateStart') ?? '';
  const naklDateEnd = url.searchParams.get('naklDateEnd') ?? '';

  let filterObject = {};
  const andArr = [];

  if (filterSTR) {
    const myRegex = { $regex: filterSTR, $options: 'i' };

    const orObject = {
      $or: [
        {
          nakladnayaRemsNumber1: myRegex,
        },
        {
          nakladnayaRemsNumber2: myRegex,
        },
        {
          nakladnayaRemsNumber3: myRegex,
        },
      ],
    };

    andArr.push(orObject);
  }

  if (contract) {
    andArr.push({ contract: contract });
  }
  if (executorFirm1) {
    andArr.push({ executorFirm1: executorFirm1 });
  }
  if (executorFirm2) {
    andArr.push({ executorFirm2: executorFirm2 });
  }
  if (executorFirm3) {
    andArr.push({ executorFirm3: executorFirm3 });
  }
  if (clientFirm) {
    andArr.push({ clientFirm: clientFirm });
  }
  if (ourFirm) {
    andArr.push({ ourFirm: ourFirm });
  }

  if (naklDateStart && naklDateEnd) {
    andArr.push({
      nakladnayaRemsDate: {
        $gte: new Date(naklDateStart),
        $lte: new Date(naklDateEnd),
      },
    });
  }

  if (andArr.length > 0) {
    filterObject = {
      $and: andArr,
    };
  }

  try {
    await connectToDB();

    const total: number = await Model__NakladnayaRems.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await Model__NakladnayaRems.find(filterObject)

      .limit(pageSize)
      .skip(skip)
      .sort({
        nakladnayaRemsDate: -1,
      })
      .populate({
        path: 'contract',
        model: Model__Contract,
        // select: 'contractNumber contractDescription',
        populate: [
          {
            path: 'ourFirm',
            model: Model__Client,
            // select: 'clientShortName',
            populate: [
              {
                path: 'firmType',
                model: Model__FirmType,
                select: 'firmTypeShortName',
              },
            ],
          },
          {
            path: 'client',
            model: Model__Client,
            // select: 'clientShortName',
            populate: [
              {
                path: 'firmType',
                model: Model__FirmType,
                select: 'firmTypeShortName',
              },
            ],
          },
        ],
      })
      .populate({
        path: 'products.product',
        model: Model__Product,
        select: 'productName',
        populate: [
          {
            path: 'unit',
            model: Model__Unit,
            select: 'unitName',
          },
        ],
      })
      .populate({
        path: 'executorFirm1',
        model: Model__Client,
        populate: [
          {
            path: 'firmType',
            model: Model__FirmType,
            select: 'firmTypeShortName',
          },
          {
            path: 'taxationType',
            model: Model__TaxationType,
            select: 'taxationTypeName',
          },
        ],
      })
      .populate({
        path: 'executorFirm2',
        model: Model__Client,
        populate: [
          {
            path: 'firmType',
            model: Model__FirmType,
            select: 'firmTypeShortName',
          },
          {
            path: 'taxationType',
            model: Model__TaxationType,
            select: 'taxationTypeName',
          },
        ],
      })
      .populate({
        path: 'executorFirm3',
        model: Model__Client,
        populate: [
          {
            path: 'firmType',
            model: Model__FirmType,
            select: 'firmTypeShortName',
          },
          {
            path: 'taxationType',
            model: Model__TaxationType,
            select: 'taxationTypeName',
          },
        ],
      })
      .populate({
        path: 'clientFirm',
        model: Model__Client,
        populate: [
          {
            path: 'firmType',
            model: Model__FirmType,
            select: 'firmTypeShortName',
          },
        ],
      })
      .populate({
        path: 'ourFirm',
        model: Model__Client,
        populate: [
          {
            path: 'firmType',
            model: Model__FirmType,
            select: 'firmTypeShortName',
          },
        ],
      });

    if (!all__ITEMS) {
      return new NextResponse(
        JSON.stringify({
          message: 'На данный момент ничего в базе нет',
        }),

        {
          status: 400,
        }
      );
    }

    const responseObj = {
      message: 'Найдено успешно',
      my_data: {
        items: all__ITEMS,
        total,
        totalPages,
      },
    };
    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

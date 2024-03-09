import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/(back)/api/auth/[...nextauth]/options';

import Model__CalendarnGrafik from '@/lib/mongoose/models/manager/documents/Model__CalendarnGrafik';

import Model__Contract from '@/lib/mongoose/models/manager/refdata/Model__Contract';
import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
  const { contract, serviceWorks } = await request.json();

  if (!contract || (serviceWorks && serviceWorks.length === 0)) {
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
    const already__Exists = await Model__CalendarnGrafik.findOne({
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

    const new__ITEM = await Model__CalendarnGrafik.create({
      contract,
      serviceWorks,
      creator: session?.user._id,
    });

    if (!new__ITEM) {
      return new NextResponse(
        JSON.stringify({
          message: 'Не удалось создать grafik',
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

  let filterObject = {};
  const andArr = [];

  if (filterSTR) {
    const myRegex = { $regex: filterSTR, $options: 'i' };

    const orObject = {
      $or: [
        {
          'serviceWorks.serviceWork': myRegex,
        },
        {
          'serviceWorks.unit': myRegex,
        },
        {
          'serviceWorks.amount': myRegex,
        },
      ],
    };

    andArr.push(orObject);
  }

  if (contract) {
    andArr.push({ contract: contract });
  }

  if (andArr.length > 0) {
    filterObject = {
      $and: andArr,
    };
  }

  try {
    await connectToDB();

    const total: number = await Model__CalendarnGrafik.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await Model__CalendarnGrafik.find(filterObject)

      .limit(pageSize)
      .skip(skip)
      .sort({})
      .populate({
        path: 'contract',
        model: Model__Contract,
        select: 'contractNumber contractDescription',
        populate: [
          {
            path: 'ourFirm',
            model: Model__Client,
            // select: 'clientShortName',
          },
          {
            path: 'client',
            model: Model__Client,
            // select: 'clientShortName',
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

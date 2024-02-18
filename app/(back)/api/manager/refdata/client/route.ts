import { NextRequest, NextResponse } from 'next/server';
import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';
import Model__FirmType from '@/lib/mongoose/models/accountant/refData/Model__FirmType';
import Model__TaxationType from '@/lib/mongoose/models/accountant/refData/Model__TaxationType';
import Model__ClientType from '@/lib/mongoose/models/accountant/refData/Model__ClientType';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
  const {
    clientLongName,
    clientShortName,
    firmType,

    postIndex,
    address,
    edrpou,
    inn,
    iban,
    iban_budget,

    passportNumber,
    firstName_imen,
    patronymic_imen,
    lastName_imen,
    firstName_rodit,
    patronymic_rodit,
    lastName_rodit,

    certificateNumber,
    representedBy,
    whichActsOnTheBasis,

    jobTitle,
    jobTitle_rodit,
    tax,
    taxationType,

    certificate_PDV,
    telNumber,
    email,
    clientType,
  } = await request.json();

  if (
    !clientLongName ||
    !clientShortName ||
    !firmType ||
    !postIndex ||
    !address ||
    !firstName_imen ||
    !patronymic_imen ||
    !lastName_imen ||
    !firstName_rodit ||
    !patronymic_rodit ||
    !lastName_rodit ||
    !taxationType ||
    !clientType
  ) {
    return new NextResponse(
      JSON.stringify({
        message: 'Please add all fields',
      }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    // Check if already exists
    const already__Exists = await Model__Client.findOne({
      clientLongName,
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
    const new__ITEM = await Model__Client.create({
      clientLongName,
      clientShortName,
      firmType,

      postIndex,
      address,
      edrpou,
      inn,
      iban,
      iban_budget,

      passportNumber,
      firstName_imen,
      patronymic_imen,
      lastName_imen,
      firstName_rodit,
      patronymic_rodit,
      lastName_rodit,

      certificateNumber,
      representedBy,
      whichActsOnTheBasis,

      jobTitle,
      jobTitle_rodit,
      tax,
      taxationType,

      certificate_PDV,
      telNumber,
      email: email.toLowerCase(),
      clientType,
    });

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
  const firmType = url.searchParams.get('firmType') ?? '';
  const taxationType = url.searchParams.get('taxationType') ?? '';
  const clientType = url.searchParams.get('clientType') ?? '';

  let filterObject = {};
  const andArr = [];

  if (filterSTR) {
    const myRegex = { $regex: filterSTR, $options: 'i' };
    const orObject = {
      $or: [
        { clientLongName: myRegex },
        { clientShortName: myRegex },

        { postIndex: myRegex },
        { address: myRegex },
        { edrpou: myRegex },
        { inn: myRegex },
        { iban: myRegex },
        { iban_budget: myRegex },

        { passportNumber: myRegex },
        { patronymic_imen: myRegex },
        { lastName_imen: myRegex },
        { firstName_imen: myRegex },
        { telNumber: myRegex },
        { email: myRegex },
      ],
    };
    andArr.push(orObject);
  }

  if (firmType) {
    andArr.push({ firmType: firmType });
  }
  if (taxationType) {
    andArr.push({ taxationType: taxationType });
  }
  if (clientType) {
    const toArr = clientType.split(',');
    andArr.push({ clientType: { $all: toArr } });
  }

  if (andArr.length > 0) {
    filterObject = {
      $and: andArr,
    };
  }

  try {
    await connectToDB();

    const total: number = await Model__Client.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await Model__Client.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        clientLongName: 1,
      })
      .populate({
        path: 'firmType',
        model: Model__FirmType,
        select: 'firmTypeLongName firmTypeShortName',
      })
      .populate({
        path: 'taxationType',
        model: Model__TaxationType,
        select: 'taxationTypeName',
      })
      .populate({
        path: 'clientType',
        model: Model__ClientType,
        select: 'clientTypeName',
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

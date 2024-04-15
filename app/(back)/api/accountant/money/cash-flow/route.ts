import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/(back)/api/auth/[...nextauth]/options';
import Model__CashFlow from '@/lib/mongoose/models/accountant/money/Model__CashFlow';

import Model__CashFlowType from '@/lib/mongoose/models/accountant/refData/Model__CashFlowType';
import Model__CashRegister from '@/lib/mongoose/models/accountant/refData/Model__CashRegister';
import Model__Contract from '@/lib/mongoose/models/manager/refdata/Model__Contract';
import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';
import Model__Worker from '@/lib/mongoose/models/accountant/refData/Model__Worker';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
  const formData = await request.json();
  console.log(formData);
  const {
    cashFlowDate,
    cashFlowSum,
    cashFlowType,
    сashRegister,
    contract,
    ourFirm,
    client,
    responsiblePerson,
    additionalInformation,
  } = formData;
  if (!cashFlowSum || !cashFlowType || !сashRegister) {
    return new NextResponse(
      JSON.stringify({
        message: 'Please add all fields',
      }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    const session = await getServerSession(authOptions);

    const new__ITEM = await Model__CashFlow.create({
      cashFlowDate,
      cashFlowSum,
      cashFlowType,
      сashRegister,

      contract: contract !== '' ? contract : null,
      ourFirm: ourFirm !== '' ? ourFirm : null,
      client: client !== '' ? client : null,
      responsiblePerson: responsiblePerson !== '' ? responsiblePerson : null,
      additionalInformation,
      creator: session?.user._id,
    });

    const responseObj = {
      message: 'Добавлено успешно',
      my_data: new__ITEM,
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') ?? '0');
  const pageSize = parseInt(url.searchParams.get('limit') ?? '0');
  const filterSTR = url.searchParams.get('filter') ?? '';

  const cashFlowType = url.searchParams.get('cashFlowType') ?? '';
  const сashRegister = url.searchParams.get('сashRegister') ?? '';
  const contract = url.searchParams.get('contract') ?? '';
  const responsiblePerson = url.searchParams.get('responsiblePerson') ?? '';
  const ourFirm = url.searchParams.get('ourFirm') ?? '';
  const client = url.searchParams.get('client') ?? '';

  const dateStart = url.searchParams.get('dateStart') ?? '';
  const dateEnd = url.searchParams.get('dateEnd') ?? '';
  const sumStart = url.searchParams.get('sumStart') ?? '';
  const sumEnd = url.searchParams.get('sumEnd') ?? '';
  const skip = (page - 1) * pageSize;
  let filterObject = {};
  const andArr = [];

  if (filterSTR) {
    const myRegex = { $regex: filterSTR, $options: 'i' };

    const orObject = {
      $or: [{ additionalInformation: myRegex }],
    };
    andArr.push(orObject);
  }

  if (cashFlowType) {
    andArr.push({ cashFlowType: cashFlowType });
  }

  if (сashRegister) {
    andArr.push({ сashRegister: сashRegister });
  }
  if (contract) {
    andArr.push({ contract: contract });
  }
  if (responsiblePerson) {
    andArr.push({ responsiblePerson: responsiblePerson });
  }
  if (ourFirm) {
    andArr.push({ ourFirm: ourFirm });
  }
  if (client) {
    andArr.push({ client: client });
  }

  if (dateStart && dateEnd) {
    andArr.push({
      cashFlowDate: {
        $gte: new Date(dateStart),
        $lte: new Date(dateEnd),
      },
    });
  }

  if (sumStart && sumEnd) {
    andArr.push({
      cashFlowSum: {
        $gte: Number(sumStart),
        $lte: Number(sumEnd),
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

    const total: number = await Model__CashFlow.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await Model__CashFlow.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        cashFlowDate: -1,
      })
      .populate({
        path: 'responsiblePerson',
        model: Model__Worker,
        select: 'lastName firstName',
      })
      .populate({
        path: 'cashFlowType',
        model: Model__CashFlowType,
      })
      .populate({
        path: 'сashRegister',
        model: Model__CashRegister,
        populate: [
          {
            path: 'allowedWorkers',
            model: Model__Worker,
            select: 'lastName firstName',
          },
        ],
      })
      .populate({
        path: 'contract',
        model: Model__Contract,
        select: 'contractNumber contractDescription',
      })
      .populate({
        path: 'ourFirm',
        model: Model__Client,
        select: 'clientShortName',
      })
      .populate({
        path: 'client',
        model: Model__Client,
        select: 'clientShortName',
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

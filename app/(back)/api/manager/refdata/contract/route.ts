import { NextRequest, NextResponse } from 'next/server';
import Model__Contract from '@/lib/mongoose/models/manager/refdata/Model__Contract';

import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';
import Model__ContractType from '@/lib/mongoose/models/accountant/refData/Model__ContractType';
import Model__PaymentSource from '@/lib/mongoose/models/accountant/refData/Model__PaymentSource';
import Model__Worker from '@/lib/mongoose/models/accountant/refData/Model__Worker';
import Model__FirmType from '@/lib/mongoose/models/accountant/refData/Model__FirmType';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
  const {
    contractNumber,
    ourFirm,
    client,

    contractDate,
    contractDescription,
    workAddress,
    contractType,
    paymentSource,
    responsibleManager,
    responsibleWorker,
    participantsOfContract,

    isMeasured,
    isEstimateCalculated,
    isEstimateHasBeenSentToClient,
    isEstimateApprovedByClient,
    isMaterialsHaveBeenOrdered,
    isMaterialsDelivered,
    isWorkCompleted,
    isDocumentsHaveBeenIssued,
    isDocumentsHaveBeenGivenToClient,
    isClientReturnedSignedDocuments,
    isContractPaid,
    isMaterialsPaid,
    isWorksPaid,
  } = await request.json();
  if (
    !contractNumber ||
    !ourFirm ||
    !client ||
    !contractDate ||
    !contractDescription ||
    !workAddress ||
    !contractType ||
    !paymentSource ||
    !responsibleManager ||
    !responsibleWorker ||
    !participantsOfContract
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
    const already__Exists = await Model__Contract.findOne({
      contractNumber,
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
    const new__ITEM = await Model__Contract.create({
      contractNumber,
      ourFirm,
      client,

      contractDate,
      contractDescription,
      workAddress,
      contractType,
      paymentSource,
      responsibleManager,
      responsibleWorker,
      participantsOfContract,

      isMeasured,
      isEstimateCalculated,
      isEstimateHasBeenSentToClient,
      isEstimateApprovedByClient,
      isMaterialsHaveBeenOrdered,
      isMaterialsDelivered,
      isWorkCompleted,
      isDocumentsHaveBeenIssued,
      isDocumentsHaveBeenGivenToClient,
      isClientReturnedSignedDocuments,
      isContractPaid,
      isMaterialsPaid,
      isWorksPaid,
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
  const filterSTR = url.searchParams.get('filter') ?? '';
  const skip = (page - 1) * pageSize;
  let filterObject = {};

  if (filterSTR) {
    const myRegex = { $regex: filterSTR, $options: 'i' };

    filterObject = {
      $or: [
        { contractNumber: myRegex },
        { contractDescription: myRegex },
        { workAddress: myRegex },
      ],
    };
  }

  try {
    await connectToDB();

    const total: number = await Model__Contract.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await Model__Contract.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        contractDate: -1,
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
        populate: [
          {
            path: 'firmType',
            model: Model__FirmType,
            select: 'firmTypeShortName',
          },
        ],
      })
      .populate({
        path: 'contractType',
        model: Model__ContractType,
        select: 'contractTypeName',
      })
      .populate({
        path: 'paymentSource',
        model: Model__PaymentSource,
        select: 'paymentSourceName',
      })
      .populate({
        path: 'responsibleManager',
        model: Model__Worker,
        select: 'lastName firstName',
      })
      .populate({
        path: 'responsibleWorker',
        model: Model__Worker,
        select: 'lastName firstName',
      })
      .populate({
        path: 'participantsOfContract.participant',
        model: Model__Worker,
        select: 'lastName firstName',
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

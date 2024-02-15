import { NextRequest, NextResponse } from 'next/server';
import Model__Contract from '@/lib/mongoose/models/manager/refdata/Model__Contract';

import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';
import Model__ContractType from '@/lib/mongoose/models/accountant/refData/Model__ContractType';
import Model__PaymentSource from '@/lib/mongoose/models/accountant/refData/Model__PaymentSource';
import Model__Worker from '@/lib/mongoose/models/accountant/refData/Model__Worker';
import Model__FirmType from '@/lib/mongoose/models/accountant/refData/Model__FirmType';

import { connectToDB } from '@/lib/mongoose/connectToDB';

type Props = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, { params }: Props) => {
  const { id } = params;
  try {
    await connectToDB();
    const one__ITEM = await Model__Contract.findById(id)
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

    if (!one__ITEM) {
      return new NextResponse(
        JSON.stringify({
          message: 'Нет  объекта с данным id',
        }),
        {
          status: 400,
        }
      );
    }
    const responseObj = {
      message: 'Элемент найден успешно',
      my_data: one__ITEM,
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: Props) => {
  const { id } = params;
  const myData = await request.json();

  if (!myData) {
    return new NextResponse(
      JSON.stringify({
        message: 'Please add all fields',
      }),

      { status: 400 }
    );
  }
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
  } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
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
    };

    const updated__ITEM = await Model__Contract.findByIdAndUpdate(
      id,
      new__ITEM,
      {
        new: true,
        runValidators: true,
      }
    );

    const responseObj = {
      message: 'Элемент изменен успешно',
      my_data: updated__ITEM,
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: Props) => {
  const { id } = params;
  try {
    await connectToDB();
    const one__ITEM = await Model__Contract.findByIdAndDelete(id);

    if (!one__ITEM) {
      return new NextResponse(
        JSON.stringify({
          message: 'Нет  объекта с данным id',
        }),
        {
          status: 400,
        }
      );
    }
    const responseObj = {
      message: 'Элемент удалён успешно',
      my_data: {},
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

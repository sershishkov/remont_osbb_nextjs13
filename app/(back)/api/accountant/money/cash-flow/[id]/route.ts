import { NextRequest, NextResponse } from 'next/server';
import Model__CashFlow from '@/lib/mongoose/models/accountant/money/Model__CashFlow';
import Model__CashFlowType from '@/lib/mongoose/models/accountant/refData/Model__CashFlowType';
import Model__CashRegister from '@/lib/mongoose/models/accountant/refData/Model__CashRegister';
import Model__Contract from '@/lib/mongoose/models/manager/refdata/Model__Contract';
import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';
import Model__Worker from '@/lib/mongoose/models/accountant/refData/Model__Worker';

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
    const one__ITEM = await Model__CashFlow.findById(id)
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
    cashFlowDate,
    cashFlowSum,
    cashFlowType,
    сashRegister,
    contract,
    ourFirm,
    client,
    responsiblePerson,
    additionalInformation,
  } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
      cashFlowDate,
      cashFlowSum,
      cashFlowType,
      сashRegister,

      contract: contract !== '' ? contract : null,
      ourFirm: ourFirm !== '' ? ourFirm : null,
      client: client !== '' ? client : null,
      responsiblePerson: responsiblePerson !== '' ? responsiblePerson : null,
      additionalInformation,
    };

    const updated__ITEM = await Model__CashFlow.findByIdAndUpdate(
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

    const one__ITEM = await Model__CashFlow.findByIdAndDelete(id);

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

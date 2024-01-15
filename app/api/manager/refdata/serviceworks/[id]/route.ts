import { NextRequest, NextResponse } from 'next/server';
import Model__ServiceWork from '@/lib/mongoose/models/manager/refdata/Model__ServiceWork';
import Model__ServiceWorkGroup from '@/lib/mongoose/models/manager/refdata/Model__ServiceWorkGroup';
import Model__Product from '@/lib/mongoose/models/manager/refdata/Model__Product';
import Model__Unit from '@/lib/mongoose/models/manager/refdata/Model__Unit';

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
    const one__ITEM = await Model__ServiceWork.findById(id)
      .populate({ path: 'unit', model: Model__Unit, select: 'unitName' })
      .populate({
        path: 'serviceWorkGroup',
        model: Model__ServiceWorkGroup,
        select: 'serviceWorkGroupName',
      })
      .populate({
        path: 'products',
        model: Model__Product,
        select: 'productName',
      })
      .populate({
        path: 'inventars',
        model: Model__Product,
        select: 'productName',
      })
      .populate({ path: 'tools', model: Model__Product, select: 'productName' })
      .populate({
        path: 'equipment',
        model: Model__Product,
        select: 'productName',
      })
      .populate({
        path: 'workerProtection',
        model: Model__Product,
        select: 'productName',
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
        message: 'Please add some fields',
      }),

      { status: 400 }
    );
  }
  const {
    serviceWorkName,
    description,
    unit,
    serviceWorkGroup,
    priceWorkerRecommend,
    priceClientRecommend,
    products,
    inventars,
    tools,
    equipment,
    workerProtection,
  } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
      serviceWorkName,
      description,
      unit,
      serviceWorkGroup,
      priceWorkerRecommend,
      priceClientRecommend,
      products,
      inventars,
      tools,
      equipment,
      workerProtection,
    };

    const updated__ITEM = await Model__ServiceWork.findByIdAndUpdate(
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
    const one__ITEM = await Model__ServiceWork.findByIdAndDelete(id);

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

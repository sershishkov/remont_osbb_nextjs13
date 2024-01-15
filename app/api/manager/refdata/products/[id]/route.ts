import { NextRequest, NextResponse } from 'next/server';
import Model__Product from '@/lib/mongoose/models/manager/refdata/Model__Product';
import Model__ProductGroup from '@/lib/mongoose/models/manager/refdata/Model__ProductGroup';
import Model__ProductType from '@/lib/mongoose/models/manager/refdata/Model__ProductType';
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
    const one__ITEM = await Model__Product.findById(id)
      .populate({ path: 'unit', model: Model__Unit, select: 'unitName' })
      .populate({
        path: 'productGroup',
        model: Model__ProductGroup,
        select: 'productGroupName',
      })
      .populate({
        path: 'productType',
        model: Model__ProductType,
        select: 'productTypeName',
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
    productName,
    description,
    unit,
    productGroup,
    productType,
    priceBuyRecommend,
    normPerOne,
    amountInPackage,
    weight,
    height,
    width,
    length,
    paintingArea,
  } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
      productName,
      description,
      unit,
      productGroup,
      productType,
      priceBuyRecommend,
      normPerOne,
      amountInPackage,
      weight,
      height,
      width,
      length,
      paintingArea,
    };

    const updated__ITEM = await Model__Product.findByIdAndUpdate(
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
    const one__ITEM = await Model__Product.findByIdAndDelete(id);

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

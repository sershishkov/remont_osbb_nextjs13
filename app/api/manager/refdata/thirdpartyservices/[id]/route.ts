import { NextRequest, NextResponse } from 'next/server';
import Model__ThirdPartyService from '@/lib/mongoose/models/manager/refdata/Model__ThirdPartyService';
import Model__ThirdPartyServiceGroup from '@/lib/mongoose/models/manager/refdata/Model__ThirdPartyServiceGroup';
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
    const one__ITEM = await Model__ThirdPartyService.findById(id)
      .populate({ path: 'unit', model: Model__Unit, select: 'unitName' })
      .populate({
        path: 'thirdPartyServiceGroup',
        model: Model__ThirdPartyServiceGroup,
        select: 'thirdPartyServiceGroupName',
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
    thirdPartyServiceName,
    description,
    unit,
    thirdPartyServiceGroup,
    priceBuyRecommend,
  } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
      thirdPartyServiceName,
      description,
      unit,
      thirdPartyServiceGroup,
      priceBuyRecommend,
    };

    const updated__ITEM = await Model__ThirdPartyService.findByIdAndUpdate(
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
    const one__ITEM = await Model__ThirdPartyService.findByIdAndDelete(id);

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
      my_data: one__ITEM._id,
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

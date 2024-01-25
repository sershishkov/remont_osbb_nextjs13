import { NextRequest, NextResponse } from 'next/server';
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
    const one__ITEM = await Model__FirmType.findById(id);

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
  const { firmTypeLongName, firmTypeShortName } = await request.json();

  if (!firmTypeLongName || !firmTypeShortName) {
    return new NextResponse(
      JSON.stringify({
        message: 'Please add all fields',
      }),

      { status: 400 }
    );
  }

  try {
    await connectToDB();

    const new__ITEM = {
      firmTypeLongName,
      firmTypeShortName,
    };

    const updated__ITEM = await Model__FirmType.findByIdAndUpdate(
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
    const one__ITEM = await Model__FirmType.findByIdAndDelete(id);

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

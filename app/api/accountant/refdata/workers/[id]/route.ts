import { NextRequest, NextResponse } from 'next/server';
import Model__User from '@/lib/mongoose/models/Model__User';
import Model__WorkerProfession from '@/lib/mongoose/models/accountant/refData/Model__WorkerProfession';
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
    const one__ITEM = await Model__Worker.findById(id)
      .populate({
        path: 'user',
        model: Model__User,
        select: 'name email role',
      })
      .populate({
        path: 'workerProfessions',
        model: Model__WorkerProfession,
        // select: 'workerProfessionName description',
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
    user,
    firstName,
    patronymic,
    lastName,
    workerProfessions,
    passportNumber,
    representedBy,
    whenIssued,
    inn,
    birthDay,
    telNumber,
    address,
  } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
      user,
      firstName,
      patronymic,
      lastName,
      workerProfessions,
      passportNumber,
      representedBy,
      whenIssued,
      inn,
      birthDay,
      telNumber,
      address,
    };

    const updated__ITEM = await Model__Worker.findByIdAndUpdate(id, new__ITEM, {
      new: true,
      runValidators: true,
    });

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
    const one__ITEM = await Model__Worker.findByIdAndDelete(id);

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

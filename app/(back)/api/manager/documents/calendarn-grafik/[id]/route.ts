import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/(back)/api/auth/[...nextauth]/options';

import Model__CalendarnGrafik from '@/lib/mongoose/models/manager/documents/Model__CalendarnGrafik';
import Model__Contract from '@/lib/mongoose/models/manager/refdata/Model__Contract';
import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';

import { connectToDB } from '@/lib/mongoose/connectToDB';
import { accountant_role } from '@/constants/constants';

type Props = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, { params }: Props) => {
  const { id } = params;
  try {
    await connectToDB();
    const one__ITEM = await Model__CalendarnGrafik.findById(id).populate({
      path: 'contract',
      model: Model__Contract,
      select: 'contractNumber contractDescription',
      populate: [
        {
          path: 'ourFirm',
          model: Model__Client,
          // select: 'clientShortName',
        },
        {
          path: 'client',
          model: Model__Client,
          // select: 'clientShortName',
        },
      ],
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
  const { contract, serviceWorks } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
      contract,
      serviceWorks,
    };

    const updated__ITEM = await Model__CalendarnGrafik.findByIdAndUpdate(
      id,
      new__ITEM,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated__ITEM) {
      return new NextResponse(
        JSON.stringify({
          message: 'Не удалось обновить Model__CalendarnGrafik',
        }),
        {
          status: 400,
        }
      );
    }

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

    const one__ITEM = await Model__CalendarnGrafik.findById(id);

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

    const session = await getServerSession(authOptions);
    const currentRole = session?.user.role;

    if (!accountant_role.includes(currentRole!)) {
      return new NextResponse(
        JSON.stringify({
          message: 'У Вас нет прав на удаление',
        }),
        {
          status: 403,
        }
      );
    } else {
      await Model__CalendarnGrafik.findByIdAndDelete(id);
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

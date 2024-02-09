import { NextRequest, NextResponse } from 'next/server';
import Model__ThirdPartyServiceGroup from '@/lib/mongoose/models/manager/refdata/Model__ThirdPartyServiceGroup';
import Model__ThirdPartyService from '@/lib/mongoose/models/manager/refdata/Model__ThirdPartyService';

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
    const one__ITEM = await Model__ThirdPartyServiceGroup.findById(id);

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
  const { thirdPartyServiceGroupName } = await request.json();

  if (!thirdPartyServiceGroupName) {
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
      thirdPartyServiceGroupName,
    };

    const updated__ITEM = await Model__ThirdPartyServiceGroup.findByIdAndUpdate(
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

    const related__ThirdPartyService = await Model__ThirdPartyService.findOne({
      thirdPartyServiceGroup: [id],
    });

    if (related__ThirdPartyService) {
      return new NextResponse(
        JSON.stringify({
          message: 'не возможно удалить этот елемент, есть связанные элементы',
        }),
        {
          status: 403,
        }
      );
    } else {
      const one__ITEM = await Model__ThirdPartyServiceGroup.findByIdAndDelete(
        id
      );

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
    }
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

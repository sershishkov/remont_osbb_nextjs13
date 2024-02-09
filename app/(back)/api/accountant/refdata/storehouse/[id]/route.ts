import { NextRequest, NextResponse } from 'next/server';
import Model__StoreHouse from '@/lib/mongoose/models/accountant/refData/Model__StoreHouse';

import Model__Worker from '@/lib/mongoose/models/accountant/refData/Model__Worker';
import Model__Product from '@/lib/mongoose/models/manager/refdata/Model__Product';
import Model__Unit from '@/lib/mongoose/models/manager/refdata/Model__Unit';
import Model__DocumentNakladnaya from '@/lib/mongoose/models/manager/documents/Model__DocumentNakladnaya';

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
    const one__ITEM = await Model__StoreHouse.findById(id)
      .populate({
        path: 'responsiblePerson',
        model: Model__Worker,
        select: 'lastName firstName',
      })
      .populate({
        path: 'products.product',
        model: Model__Product,
        select: 'productName',
        populate: [
          {
            path: 'unit',
            model: Model__Unit,
            select: 'unitName',
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
  const { storeHouseName, address, products, responsiblePerson } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
      storeHouseName,
      address,
      products,
      responsiblePerson,
    };

    const updated__ITEM = await Model__StoreHouse.findByIdAndUpdate(
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

    const related__Nakladnaya = await Model__DocumentNakladnaya.findOne({
      storeHouse: id,
    });

    if (related__Nakladnaya) {
      return new NextResponse(
        JSON.stringify({
          message: 'не возможно удалить этот елемент, есть связанные элементы',
        }),
        {
          status: 403,
        }
      );
    } else {
      const one__ITEM = await Model__StoreHouse.findByIdAndDelete(id);

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

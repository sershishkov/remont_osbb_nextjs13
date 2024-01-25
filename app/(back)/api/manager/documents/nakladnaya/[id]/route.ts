import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/(back)/api/auth/[...nextauth]/options';
import DocumentNakladnaya from '@/lib/mongoose/models/manager/documents/Model__DocumentNakladnaya';

import Model__Contract from '@/lib/mongoose/models/manager/refdata/Model__Contract';
import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';
import Model__StoreHouse from '@/lib/mongoose/models/accountant/refData/Model__StoreHouse';
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
    const one__ITEM = await DocumentNakladnaya.findById(id)
      .populate({
        path: 'contract',
        model: Model__Contract,
        select: 'contractNumber contractDescription',
        populate: [
          {
            path: 'ourFirm',
            model: Model__Client,
            select: 'clientShortName',
          },
          {
            path: 'client',
            model: Model__Client,
            select: 'clientShortName',
          },
        ],
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
      })
      .populate({
        path: 'storeHouse',
        model: Model__StoreHouse,
        select: 'storeHouseName',
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
    nakladnayaNumber,
    nakladnayaDate,
    contract,
    products,
    storeHouse,
    active,
    typeNakl,
  } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
      nakladnayaNumber,
      nakladnayaDate,
      contract,
      products,
      storeHouse,
      active,
      typeNakl,
    };

    const updated__ITEM = await DocumentNakladnaya.findByIdAndUpdate(
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
    // const session = await getServerSession(authOptions);
    // if (session?.user.role === 'admin') {
    const one__ITEM = await DocumentNakladnaya.findByIdAndDelete(id);

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
    // } else {
    //   const one__ITEM = await DocumentNakladnaya.findById(id);
    //   if (!one__ITEM) {
    //     return new NextResponse(
    //       JSON.stringify({
    //         message: 'Нет  объекта с данным id',
    //       }),
    //       {
    //         status: 400,
    //       }
    //     );
    //   }

    //   const new__DocumentNakladnaya = {
    //     active: false,
    //     deleted: true,
    //     whoDeleted: session?.user._id,
    //   };

    //   await DocumentNakladnaya.findByIdAndUpdate(id, new__DocumentNakladnaya, {
    //     new: true,
    //     runValidators: true,
    //   });
    // }

    const responseObj = {
      message: 'Элемент удалён успешно',
      my_data: {},
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
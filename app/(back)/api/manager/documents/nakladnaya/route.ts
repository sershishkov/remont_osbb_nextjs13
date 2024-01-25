import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/(back)/api/auth/[...nextauth]/options';
import DocumentNakladnaya from '@/lib/mongoose/models/manager/documents/Model__DocumentNakladnaya';

import Model__Contract from '@/lib/mongoose/models/manager/refdata/Model__Contract';
import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';
import Model__StoreHouse from '@/lib/mongoose/models/accountant/refData/Model__StoreHouse';
import Model__Product from '@/lib/mongoose/models/manager/refdata/Model__Product';
import Model__Unit from '@/lib/mongoose/models/manager/refdata/Model__Unit';

import Model__Worker from '@/lib/mongoose/models/accountant/refData/Model__Worker';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
  const {
    nakladnayaNumber,
    nakladnayaDate,
    contract,

    products,
    storeHouse,

    active,

    typeNakl,
  } = await request.json();
  if (
    !nakladnayaNumber ||
    !contract ||
    !products ||
    (products && products.length === 0) ||
    !storeHouse ||
    !active
  ) {
    return new NextResponse(
      JSON.stringify({
        message: 'Please add all fields',
      }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    // Check if already exists
    const already__Exists = await DocumentNakladnaya.findOne({
      nakladnayaNumber,
    });

    if (already__Exists) {
      return new NextResponse(
        JSON.stringify({
          message: 'This item already exists',
        }),
        {
          status: 400,
        }
      );
    }

    const session = await getServerSession(authOptions);
    console.log(session?.user);

    // const creatorLocal = await Model__Worker.findOne({
    //   user: session?.user._id,
    // });
    const creatorLocal = await Model__Worker.findOne({
      user: '6537cbcf588268360cb4dd9f',
    });

    if (!creatorLocal) {
      return new NextResponse(
        JSON.stringify({
          message:
            'Нет такого пользователя или работника или Вы не авторизированы!!!',
        }),
        {
          status: 400,
        }
      );
    }
    // console.log(creatorLocal);

    const new__ITEM = await DocumentNakladnaya.create({
      nakladnayaNumber,
      nakladnayaDate,
      contract,

      products,
      storeHouse,

      active,
      creator: creatorLocal._id,
      // creator: null,
      typeNakl,
    });

    const responseObj = {
      message: 'Добавлено успешно',
      my_data: new__ITEM,
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') ?? '0');
  const pageSize = parseInt(url.searchParams.get('limit') ?? '0');
  const filterSTR = url.searchParams.get('filter') ?? '';
  const skip = (page - 1) * pageSize;
  let filterObject = {};

  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const userRole = session?.user.role;
    console.log(userRole);
    if (filterSTR) {
      const myRegex = { $regex: filterSTR, $options: 'i' };

      filterObject = {
        $or: [
          { nakladnayaNumber: myRegex },
          // { nakladnayaDate: myRegex },
          // { deleted: userRole === 'admin' ? '' : false },
          { deleted: 'false' },
        ],
      };
    }

    const total: number = await DocumentNakladnaya.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await DocumentNakladnaya.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        nakladnayaDate: -1,
      })
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

    if (!all__ITEMS) {
      return new NextResponse(
        JSON.stringify({
          message: 'На данный момент ничего в базе нет',
        }),

        {
          status: 400,
        }
      );
    }

    const responseObj = {
      message: 'Найдено успешно',
      my_data: {
        items: all__ITEMS,
        total,
        totalPages,
      },
    };
    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

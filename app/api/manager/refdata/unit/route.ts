import { NextRequest, NextResponse } from 'next/server';
import Model__Unit from '@/lib/mongoose/models/manager/refdata/Model__Unit';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
  const { unitName } = await request.json();
  if (!unitName) {
    return new NextResponse('Please add all fields', { status: 400 });
  }

  try {
    await connectToDB();
    // Check if already exists
    const already__Exists = await Model__Unit.findOne({ unitName });

    if (already__Exists) {
      return new NextResponse('This item already exists', { status: 400 });
    }
    const new__ITEM = await Model__Unit.create({
      unitName,
    });

    const responseObj = {
      message: 'Добавлено успешно',
      my_data: new__ITEM,
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') ?? '0');
  const pageSize = parseInt(url.searchParams.get('limit') ?? '0');
  const filterSTR = url.searchParams.get('filter') ?? '';
  const skip = (page - 1) * pageSize;
  let filterObject = {};

  if (filterSTR) {
    const myRegex = { $regex: filterSTR, $options: 'i' };

    filterObject = {
      $or: [{ unitName: myRegex }],
    };
  }

  try {
    await connectToDB();

    const total: number = await Model__Unit.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await Model__Unit.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        unitName: 1,
      });

    if (!all__ITEMS) {
      return new NextResponse('На данный момент ничего в базе нет', {
        status: 400,
      });
    }
    const responseObj = {
      message: 'Добавлено успешно',
      my_data: {
        items: all__ITEMS,
        total,
        totalPages,
      },
    };
    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};

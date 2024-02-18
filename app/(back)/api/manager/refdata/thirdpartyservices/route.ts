import { NextRequest, NextResponse } from 'next/server';
import Model__ThirdPartyService from '@/lib/mongoose/models/manager/refdata/Model__ThirdPartyService';
import Model__ThirdPartyServiceGroup from '@/lib/mongoose/models/manager/refdata/Model__ThirdPartyServiceGroup';
import Model__Unit from '@/lib/mongoose/models/manager/refdata/Model__Unit';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
  const {
    thirdPartyServiceName,
    description,
    unit,
    thirdPartyServiceGroup,
    priceBuyRecommend,
  } = await request.json();
  if (
    !thirdPartyServiceName ||
    !unit ||
    !thirdPartyServiceGroup ||
    !priceBuyRecommend
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
    const already__Exists = await Model__ThirdPartyService.findOne({
      thirdPartyServiceName,
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
    const new__ITEM = await Model__ThirdPartyService.create({
      thirdPartyServiceName,
      description,
      unit,
      thirdPartyServiceGroup,
      priceBuyRecommend,
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
  const skip = (page - 1) * pageSize;

  const filterSTR = url.searchParams.get('filter') ?? '';
  const unit = url.searchParams.get('unit') ?? '';
  const thirdPartyServiceGroup =
    url.searchParams.get('thirdPartyServiceGroup') ?? '';

  let filterObject = {};

  const andArr = [];

  if (filterSTR) {
    const myRegex = { $regex: filterSTR, $options: 'i' };
    const orObject = {
      $or: [
        { thirdPartyServiceName: myRegex },
        { description: myRegex },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: `$priceBuyRecommend` },
              regex: filterSTR,
            },
          },
        },
      ],
    };
    andArr.push(orObject);
  }

  if (unit) {
    andArr.push({ unit: unit });
  }

  if (thirdPartyServiceGroup) {
    const toArr = thirdPartyServiceGroup.split(',');
    andArr.push({
      thirdPartyServiceGroup: { $all: toArr },
    });
  }

  if (andArr.length > 0) {
    filterObject = {
      $and: andArr,
    };
  }
  try {
    await connectToDB();

    const total: number = await Model__ThirdPartyService.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await Model__ThirdPartyService.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        thirdPartyServiceName: 1,
      })
      .populate({ path: 'unit', model: Model__Unit, select: 'unitName' })
      .populate({
        path: 'thirdPartyServiceGroup',
        model: Model__ThirdPartyServiceGroup,
        select: 'thirdPartyServiceGroupName',
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

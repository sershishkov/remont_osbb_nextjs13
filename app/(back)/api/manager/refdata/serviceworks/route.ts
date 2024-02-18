import { NextRequest, NextResponse } from 'next/server';
import Model__ServiceWork from '@/lib/mongoose/models/manager/refdata/Model__ServiceWork';
import Model__ServiceWorkGroup from '@/lib/mongoose/models/manager/refdata/Model__ServiceWorkGroup';
import Model__Product from '@/lib/mongoose/models/manager/refdata/Model__Product';
import Model__Unit from '@/lib/mongoose/models/manager/refdata/Model__Unit';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
  const {
    serviceWorkName,
    description,
    unit,
    serviceWorkGroup,
    priceWorkerRecommend,
    priceClientRecommend,
    products,
    inventars,
    tools,
    equipment,
    workerProtection,
  } = await request.json();
  if (!serviceWorkName || !unit || !serviceWorkGroup || !priceWorkerRecommend) {
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
    const already__Exists = await Model__ServiceWork.findOne({
      serviceWorkName,
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
    const new__ITEM = await Model__ServiceWork.create({
      serviceWorkName,
      description,
      unit,
      serviceWorkGroup,
      priceWorkerRecommend,
      priceClientRecommend,
      products,
      inventars,
      tools,
      equipment,
      workerProtection,
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
  const serviceWorkGroup = url.searchParams.get('serviceWorkGroup') ?? '';
  const products = url.searchParams.get('products') ?? '';
  const inventars = url.searchParams.get('inventars') ?? '';
  const tools = url.searchParams.get('tools') ?? '';
  const equipment = url.searchParams.get('equipment') ?? '';
  const workerProtection = url.searchParams.get('workerProtection') ?? '';

  let filterObject = {};

  const andArr = [];

  if (filterSTR) {
    const myRegex = { $regex: filterSTR, $options: 'i' };
    const orObject = {
      $or: [
        { serviceWorkName: myRegex },
        { description: myRegex },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: `$priceWorkerRecommend` },
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

  if (serviceWorkGroup) {
    const toArr = serviceWorkGroup.split(',');
    andArr.push({
      serviceWorkGroup: { $all: toArr },
    });
  }
  if (products) {
    const toArr = products.split(',');
    andArr.push({ products: { $all: toArr } });
  }
  if (inventars) {
    const toArr = inventars.split(',');
    andArr.push({ inventars: { $all: toArr } });
  }
  if (tools) {
    const toArr = tools.split(',');
    andArr.push({ tools: { $all: toArr } });
  }
  if (equipment) {
    const toArr = equipment.split(',');
    andArr.push({ equipment: { $all: toArr } });
  }
  if (workerProtection) {
    const toArr = workerProtection.split(',');
    andArr.push({ workerProtection: { $all: toArr } });
  }

  if (andArr.length > 0) {
    filterObject = {
      $and: andArr,
    };
  }

  try {
    await connectToDB();

    const total: number = await Model__ServiceWork.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await Model__ServiceWork.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        serviceWorkName: 1,
      })
      .populate({ path: 'unit', model: Model__Unit, select: 'unitName' })
      .populate({
        path: 'serviceWorkGroup',
        model: Model__ServiceWorkGroup,
        select: 'serviceWorkGroupName',
      })
      .populate({
        path: 'products',
        model: Model__Product,
        select: 'productName',
      })
      .populate({
        path: 'inventars',
        model: Model__Product,
        select: 'productName',
      })
      .populate({ path: 'tools', model: Model__Product, select: 'productName' })
      .populate({
        path: 'equipment',
        model: Model__Product,
        select: 'productName',
      })
      .populate({
        path: 'workerProtection',
        model: Model__Product,
        select: 'productName',
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

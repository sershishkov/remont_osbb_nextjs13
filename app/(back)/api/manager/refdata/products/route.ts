import { NextRequest, NextResponse } from 'next/server';
import Model__Product from '@/lib/mongoose/models/manager/refdata/Model__Product';
import Model__ProductGroup from '@/lib/mongoose/models/manager/refdata/Model__ProductGroup';
import Model__ProductType from '@/lib/mongoose/models/manager/refdata/Model__ProductType';
import Model__Unit from '@/lib/mongoose/models/manager/refdata/Model__Unit';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
  const {
    productName,
    description,
    unit,
    productGroup,
    productType,
    priceBuyRecommend,
    normPerOne,
    amountInPackage,
    weight,
    height,
    width,
    length,
    paintingArea,
  } = await request.json();
  if (!productName || !unit || !productGroup || !productType) {
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
    const already__Exists = await Model__Product.findOne({ productName });

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
    const new__ITEM = await Model__Product.create({
      productName,
      description,
      unit,
      productGroup,
      productType,
      priceBuyRecommend,
      normPerOne,
      amountInPackage,
      weight,
      height,
      width,
      length,
      paintingArea,
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
  const productType = url.searchParams.get('productType') ?? '';
  const productGroup = url.searchParams.get('productGroup') ?? '';

  let filterObject = {};

  const myRegex = { $regex: filterSTR, $options: 'i' };

  const andArr = [];

  if (filterSTR) {
    const orObject = {
      $or: [{ productName: myRegex }, { description: myRegex }],
    };
    andArr.push(orObject);
  }

  if (unit) {
    const unit__Obj = { unit: unit };
    andArr.push(unit__Obj);
  }

  if (productGroup) {
    const newProductGroup = JSON.parse(productGroup);

    const productGroup__Obj = {
      productGroup: { $all: newProductGroup },
    };
    andArr.push(productGroup__Obj);
  }

  if (productType) {
    const productType__Obj = { productType: productType };
    andArr.push(productType__Obj);
  }

  if (andArr.length > 0) {
    filterObject = {
      $and: andArr,
    };
  }

  try {
    await connectToDB();

    const total: number = await Model__Product.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await Model__Product.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        productName: 1,
      })
      .populate({ path: 'unit', model: Model__Unit, select: 'unitName' })
      .populate({
        path: 'productGroup',
        model: Model__ProductGroup,
        select: 'productGroupName',
      })
      .populate({
        path: 'productType',
        model: Model__ProductType,
        select: 'productTypeName',
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

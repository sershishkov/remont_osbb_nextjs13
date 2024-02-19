import { NextRequest, NextResponse } from 'next/server';
import Model__User from '@/lib/mongoose/models/Model__User';
import Model__WorkerProfession from '@/lib/mongoose/models/accountant/refData/Model__WorkerProfession';
import Model__Worker from '@/lib/mongoose/models/accountant/refData/Model__Worker';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const POST = async (request: NextRequest) => {
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
  } = await request.json();
  if (
    !user ||
    !firstName ||
    !lastName ||
    (workerProfessions && workerProfessions.length === 0)
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
    const already__Exists = await Model__Worker.findOne({
      user,
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
    const new__ITEM = await Model__Worker.create({
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
  const workerProfessions = url.searchParams.get('workerProfessions') ?? '';
  const birthDateStart = url.searchParams.get('birthDateStart') ?? '';
  const birthDateEnd = url.searchParams.get('birthDateEnd') ?? '';

  let filterObject = {};

  const andArr = [];

  if (filterSTR) {
    const myRegex = { $regex: filterSTR, $options: 'i' };
    const orObject = {
      $or: [
        { firstName: myRegex },
        { patronymic: myRegex },
        { lastName: myRegex },
        { passportNumber: myRegex },
        { representedBy: myRegex },
        { inn: myRegex },
        { telNumber: myRegex },
        { address: myRegex },
      ],
    };
    andArr.push(orObject);
  }

  if (workerProfessions) {
    const toArr = workerProfessions.split(',');
    andArr.push({ workerProfessions: { $all: toArr } });
  }

  if (birthDateStart && birthDateEnd) {
    andArr.push({
      birthDay: {
        $gte: new Date(birthDateStart),
        $lte: new Date(birthDateEnd),
      },
    });
  }

  if (andArr.length > 0) {
    filterObject = {
      $and: andArr,
    };
  }

  try {
    await connectToDB();

    const total: number = await Model__Worker.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await Model__Worker.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        lastName: 1,
      })
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

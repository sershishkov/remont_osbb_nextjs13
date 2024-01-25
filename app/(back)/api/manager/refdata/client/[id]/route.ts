import { NextRequest, NextResponse } from 'next/server';
import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';
import Model__FirmType from '@/lib/mongoose/models/accountant/refData/Model__FirmType';
import Model__TaxationType from '@/lib/mongoose/models/accountant/refData/Model__TaxationType';
import Model__ClientType from '@/lib/mongoose/models/accountant/refData/Model__ClientType';

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
    const one__ITEM = await Model__Client.findById(id)
      .populate({
        path: 'firmType',
        model: Model__FirmType,
        select: 'firmTypeLongName firmTypeShortName',
      })
      .populate({
        path: 'taxationType',
        model: Model__TaxationType,
        select: 'taxationTypeName',
      })
      .populate({
        path: 'clientType',
        model: Model__ClientType,
        select: 'clientTypeName',
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
    clientLongName,
    clientShortName,
    firmType,

    postIndex,
    address,
    edrpou,
    inn,
    iban,
    iban_budget,

    passportNumber,
    firstName_imen,
    patronymic_imen,
    lastName_imen,
    firstName_rodit,
    patronymic_rodit,
    lastName_rodit,

    certificateNumber,
    representedBy,
    whichActsOnTheBasis,

    jobTitle,
    jobTitle_rodit,
    tax,
    taxationType,

    certificate_PDV,
    telNumber,
    email,
    clientType,
  } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
      clientLongName,
      clientShortName,
      firmType,

      postIndex,
      address,
      edrpou,
      inn,
      iban,
      iban_budget,

      passportNumber,
      firstName_imen,
      patronymic_imen,
      lastName_imen,
      firstName_rodit,
      patronymic_rodit,
      lastName_rodit,

      certificateNumber,
      representedBy,
      whichActsOnTheBasis,

      jobTitle,
      jobTitle_rodit,
      tax,
      taxationType,

      certificate_PDV,
      telNumber,
      email,
      clientType,
    };

    const updated__ITEM = await Model__Client.findByIdAndUpdate(id, new__ITEM, {
      new: true,
      runValidators: true,
    });

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
    const one__ITEM = await Model__Client.findByIdAndDelete(id);

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
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

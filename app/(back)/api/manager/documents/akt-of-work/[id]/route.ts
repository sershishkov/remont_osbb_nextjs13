import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/(back)/api/auth/[...nextauth]/options';

import Model__DocumentAkt from '@/lib/mongoose/models/manager/documents/Model__DocumentAkt';

import Model__Contract from '@/lib/mongoose/models/manager/refdata/Model__Contract';
import Model__Client from '@/lib/mongoose/models/manager/refdata/Model__Client';
import Model__ThirdPartyService from '@/lib/mongoose/models/manager/refdata/Model__ThirdPartyService';
import Model__ServiceWork from '@/lib/mongoose/models/manager/refdata/Model__ServiceWork';

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
    const one__ITEM = await Model__DocumentAkt.findById(id)
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
        path: 'thirdPartyServices.thirdPartyService',
        model: Model__ThirdPartyService,
        select: 'thirdPartyServiceName',
        populate: [
          {
            path: 'unit',
            model: Model__Unit,
            select: 'unitName',
          },
        ],
      })
      .populate({
        path: 'serviceWorks.serviceWork',
        model: Model__ServiceWork,
        select: 'serviceWorkName',
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
  const {
    aktOfWorkNumber,
    aktOfWorkDate,
    contract,

    thirdPartyServices,
    serviceWorks,

    isActive,

    typeAkt,
  } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
      aktOfWorkNumber,
      aktOfWorkDate,
      contract,

      thirdPartyServices,
      serviceWorks,

      isActive,

      typeAkt,
    };

    const updated__ITEM = await Model__DocumentAkt.findByIdAndUpdate(
      id,
      new__ITEM,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated__ITEM) {
      return new NextResponse(
        JSON.stringify({
          message: 'Не удалось обновить накладную',
        }),
        {
          status: 400,
        }
      );
    }

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
    const session = await getServerSession(authOptions);
    const currentRole = session?.user.role;
    if (currentRole === 'admin') {
      const one__ITEM = await Model__DocumentAkt.findByIdAndDelete(id);

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
    } else {
      const one__ITEM = await Model__DocumentAkt.findById(id);
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

      const new__DocumentNakladnaya = {
        isActive: false,
        isDeleted: true,
        whoDeleted: session?.user._id,
      };

      await Model__DocumentAkt.findByIdAndUpdate(id, new__DocumentNakladnaya, {
        new: true,
        runValidators: true,
      });
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

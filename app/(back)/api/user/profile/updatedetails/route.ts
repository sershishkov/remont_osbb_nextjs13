import { NextRequest, NextResponse } from 'next/server';
import Model__User from '@/lib/mongoose/models/Model__User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const PUT = async (request: NextRequest) => {
  const { name, email, password } = await request.json();

  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const user = await Model__User.findById(session?.user._id);

    if (user) {
      user.name = name ?? user.name;
      user.email = email ?? user.email;

      if (password) {
        user.password = password;
      }

      await user.save();
    } else {
      return new NextResponse(
        JSON.stringify({
          message: 'Нет  пользователя с данным id',
        }),
        {
          status: 400,
        }
      );
    }

    const responseObj = {
      message: 'You updated your profile ',
      my_data: {},
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

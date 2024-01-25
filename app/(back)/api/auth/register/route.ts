import Model__User from '@/lib/mongoose/models/Model__User';
import { connectToDB } from '@/lib/mongoose/connectToDB';

import { NextResponse, NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();

  await connectToDB();

  const newUser = new Model__User({
    name,
    email,
    password,
  });

  try {
    await newUser.save();
    return new NextResponse('User has been created', {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};

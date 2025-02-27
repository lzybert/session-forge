import bcrypt from 'bcryptjs';
import { NextRequest,NextResponse } from 'next/server';

import { connectToDB } from '../../../lib/db';
import User, { IUser } from '../../../models/User';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    const existingUser: IUser | null = await User.findOne({ email }).select('+password');
    if (!existingUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404}
      )
    }
    const passwordMatch = await bcrypt.compare(
      password,
      existingUser.password!
    );
    console.log(passwordMatch);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Provided password does not match' },
        { status: 401}
      )
    }
    return NextResponse.json(
      { message: 'User authenticated' },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Internal Server Error. ${error}` },
      { status: 500 },
    );
  }
}

import bcrypt from 'bcryptjs';
import { NextRequest,NextResponse } from 'next/server';

import { connectToDB } from '../../../lib/db';
import User, { IUser } from '../../../models/User';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { email, password } = await req.json();
    console.log(email, password);
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email,
      password: hashedPassword,
      provider: 'credentials',
    });

    //await newUser.save();

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Internal Server Error. ${error}` },
      { status: 500 },
    );
  }
}

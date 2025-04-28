import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { connectToDB } from '../../../lib/db';
import Campaign, { ICampaign } from '../../../models/Campaign';
import User, { IUser } from '../../../models/User';

const isSignedIn = async (req: NextRequest) => {
  return await getToken({ req });
};
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { gm, title, system, description, createdAt } = await req.json();
    const existingUser: IUser | null = await User.findOne({ _id: gm });
    const isLogged = await isSignedIn(req);
    if (isLogged && existingUser) {
      await Campaign.create({
        gm,
        title,
        system,
        description,
        createdAt,
      });

      return NextResponse.json(
        { message: 'Campaign created successfully' },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: 'Please login first' },
        { status: 400 },
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Internal Server Error. ${error}` },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    await connectToDB();
    const isLogged = await isSignedIn(req);
    console.log(isLogged);
    if (isLogged) {
      //const session = await getServerSession();
      //console.log('im logged in', session?.user);
      const userCampaigns: ICampaign[] | null = await Campaign.find({
        gm: isLogged.accessToken,
      });
      console.log(userCampaigns);
      //return res.status(200).json(userCampaigns);
      return NextResponse.json({ data: userCampaigns }, { status: 200 });
    } else {
      //return res.status(400).send({ error: 'Please login first' });
      return NextResponse.json(
        { error: 'Please login first' },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error. ${error}` },
      { status: 500 },
    );
  }
}

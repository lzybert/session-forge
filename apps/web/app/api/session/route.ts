import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { connectToDB } from '../../../lib/db';
import Session, { ISession } from '../../../models/Session';
import User, { IUser } from '../../../models/User';

const isSignedIn = async (req: NextRequest) => {
  return await getToken({ req });
};
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { gm, campaignId, name, date, summary, attendees, notes, events } =
      await req.json();
    const existingUser: IUser | null = await User.findOne({ _id: gm });
    const isLogged = await isSignedIn(req);
    if (isLogged && existingUser) {
      await Session.create({
        gm,
        campaignId,
        name,
        summary,
        date,
        attendees,
        notes,
        events,
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
      const userSessions: ISession[] | null = await Session.find({
        gm: isLogged.accessToken,
      });
      console.log(userSessions);
      //return res.status(200).json(userCampaigns);
      return NextResponse.json({ data: userSessions }, { status: 200 });
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

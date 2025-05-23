import mongoose from 'mongoose';
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
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
    const url = new URL(req.url); // Use req.url to construct the URL object
    const showUpcoming = url.searchParams.get('showUpcoming') === 'true';
    console.log(isLogged, showUpcoming);
    if (isLogged) {
      const campaignsWithSessions = await Campaign.aggregate([
        {
          $match: {
            gm: new mongoose.Types.ObjectId(isLogged?.accessToken as string),
          },
        },
        {
          $lookup: {
            from: 'sessions',
            localField: '_id',
            foreignField: 'campaignId',
            pipeline: showUpcoming
              ? [
                  { $match: { date: { $gte: new Date() } } },
                  {
                    $sort: { date: 1 },
                  },
                  { $limit: 1 },
                ]
              : [],
            as: 'sessions',
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      return NextResponse.json(
        { data: campaignsWithSessions },
        { status: 200 },
      );
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

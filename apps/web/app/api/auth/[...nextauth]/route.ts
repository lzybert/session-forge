import bcrypt from 'bcryptjs';
import { Promise } from 'mongoose';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '../../../../lib/db';
import User from '../../../../models/User';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return Promise.resolve(null);
        const { email, password } = credentials;
        await connectToDB();
        const user = await User.findOne({ email: email }).select("+password");
        if (!user) {
          throw new Error("Wrong Email");
        }

        const passwordMatch = await bcrypt.compare(password, user.password as string);
        if (!passwordMatch) throw new Error("Wrong Password");
        console.log(user);
        return user;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.accessToken = user.id;
      return token;
    },
    async session({ session, token}) {
      session.user.id = token.accessToken;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
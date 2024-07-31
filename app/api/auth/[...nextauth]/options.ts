import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { directusClient } from '@/utils/request-handler';

interface CustomSession extends Session {
  accessToken?: string;
  refreshToken?: string;
}

export const directusAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const {email, password} = credentials as {
          email: string,
          password: string,
        };
        const user = await directusClient.login(email, password);
        if (!user) {
          throw new Error('Email address or password is invalid');
        }
        return user as any
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: any;
      account: any;
    }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.access_token,
          refreshToken: user.refresh_token,
        };
      }
      return token;
    },
    async session({ session, token}: { session: CustomSession; token: any }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    }
  },
};
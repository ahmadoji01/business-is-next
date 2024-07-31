import NextAuth from 'next-auth';
import { directusAuthOptions } from './options';

const handler = NextAuth(directusAuthOptions);

export { handler as GET, handler as POST };
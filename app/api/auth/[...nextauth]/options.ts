import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import Model__User from '@/lib/mongoose/models/Model__User';
import { connectToDB } from '@/lib/mongoose/connectToDB';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        // name: {
        //   label: 'name:',
        //   type: 'text',
        //   placeholder: 'your-cool-name',
        // },
        email: {
          label: 'email:',
          type: 'email',
          placeholder: 'your-EMAIL',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your-PASSWORD',
        },
      },
      async authorize(credentials) {
        await connectToDB();

        try {
          const user = await Model__User.findOne({
            email: credentials?.email,
          }).select('+password');

          if (user) {
            if (await user.matchPassword(credentials?.password)) {
              return user;
            } else {
              throw new Error('Wrong Credentials!');
            }
          } else {
            throw new Error('User not found!');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    error: '/auth/login',
  },
};

// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    _id: string;
    email: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    _id: string;
    role: string;
  }
}

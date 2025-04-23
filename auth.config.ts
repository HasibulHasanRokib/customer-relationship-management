import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { db } from "./lib/prisma";
import { loginSchema } from "./lib/zod";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validation = loginSchema.safeParse(credentials);
        if (validation.success) {
          const { email, password } = validation.data;
          const user = await db.user.findUnique({
            where: { email },
          });
          if (!user) return null;
          const matchPassword = await compare(password, user.password);
          if (matchPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

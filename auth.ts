import NextAuth, { type DefaultSession } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/prisma";
import authConfig from "./auth.config";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login-in",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      session.user.name = token.name;
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const userExist = await db.user.findFirst({
        where: { id: token.sub },
      });
      if (!userExist) return token;
      token.role = userExist.role;
      token.name = userExist.name;
      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

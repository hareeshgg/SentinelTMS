import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authFormSchema } from "./utils";
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await authFormSchema("sign-in").parseAsync(
          credentials
        );

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
            password: credentials.password,
          },
        });
        console.log("Login Succcessfull");

        if (!user) {
          throw new Error("Invalid credentials");
        }
        return {
          id: String(user.id),
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});

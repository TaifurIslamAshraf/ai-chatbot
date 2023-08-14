import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_URL,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser) {
          throw new Error("Invalid Email or Password");
        }

        //password match
        const matchPassword = await compare(
          credentials.password,
          existingUser.password
        );

        if(!matchPassword){
            throw new Error("Invalid Email or Password");
        }

        return {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
        }
      },
    }),

  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
       return {
        ...token,
        username: user.username,
       }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user:{
          ...session.user,
          username: token.username
        }
      }
    },

  }
};

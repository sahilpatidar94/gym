import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
import { prisma } from "./prisma";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text", placeholder: "name" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
        email: { label: "email", type: "text", placeholder: "email" },
      },
      async authorize(
        credentials: Record<"name" | "password" | "email", string> | undefined
      ) {
        if (!credentials) {
          console.error("No credentials provided.");
          return null;
        }

        const { name, password, email } = credentials;

        if (!name || !password || !email) {
          console.error("Missing fields: name, password, or email.");
          return null;
        }

        try {
          //   const hashedPassword = await bcrypt.hash(password, 10);

          const user = await prisma.user.create({
            data: {
              name,
              email,
              password,
            },
          });

          console.log("User created successfully:", user);

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Error creating user:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token, user }: any) => {
      console.log("Session callback", { session, token, user });
      session.user.id = token.sub || user.id;
      return session;
    },
  },
};

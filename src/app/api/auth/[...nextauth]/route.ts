import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../lib/prisma";
import { NEXT_AUTH } from "../../../../../lib/auth";

const handler = NextAuth(NEXT_AUTH); //use NEXT_AUTH where ever im using getServerSession

export { handler as GET, handler as POST };

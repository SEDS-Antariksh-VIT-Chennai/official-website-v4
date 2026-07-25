import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/error',
  },
  callbacks: {
    async signIn({ user }) {
      // Get comma-separated list of allowed emails from .env, trim spaces, and lowercase them
      const allowedEmails = (process.env.ADMIN_EMAILS || "")
        .split(',')
        .map(email => email.trim().toLowerCase())
        .filter(Boolean);
      
      const userEmail = user.email?.toLowerCase();

      // Check if the user's email is in the allowed list
      if (userEmail && allowedEmails.includes(userEmail)) {
        return true;
      }
      
      // Return false to reject the login attempt
      return false;
    },
    async session({ session, user }) {
      // if (user) {
      //   session.user.role = user.role;
      // }
      return session;
    },
  },
})

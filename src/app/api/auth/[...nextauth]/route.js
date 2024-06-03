import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoDb from "@/lib/mongoDb";
import User from "@/models/user";
import bcryptjs from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        await mongoDb();

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

        const response = {
          id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          room: user.room,
          hostel: user.hostel,
        };

        return response;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          isAdmin: token.isAdmin,
          room: token.room,
          hostel: token.hostel,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
        token.room = user.room;
        token.hostel = user.hostel;
      }
      return token;
    },
  },
  secret: "abc",
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

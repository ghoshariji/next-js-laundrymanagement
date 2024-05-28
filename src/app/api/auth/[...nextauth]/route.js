import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoDb from "@/lib/mongoDb";
import user from "@/models/user";
import bcryptjs from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        await mongoDb();
        const checkEmail = await user.findOne({ email });
        if (!checkEmail) {
          throw new Error("No user found with this email");
        }
        const passwordMatch = await bcryptjs.compare(password, checkEmail.password);
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }
        return checkEmail;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret:"abc",
  pages: {
    signIn: "/login",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

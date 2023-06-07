import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import _ from "lodash";
import axios from "axios";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
          {
            username: credentials.username,
            password: credentials.password,
          }
        );

        if (res.data.status !== 200) throw new Error("Usuário ou senha incorretos");

        const thisUserId = res.data.response.id;
        const thisUserData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/socialmoney/${thisUserId}`
        );

        if (thisUserData.data.status !== 200)
          throw new Error("Usuário não tem registro neste APP.");

        return {
          session: {
            user: {
              id: res.data.response.id,
              username: res.data.response.username,
              token: res.data.response.api_token,
              balance: thisUserData.data.response.user.balance,
              bank: thisUserData.data.response.user.bank,
              ref: thisUserData.data.response.user.ref,
            },
          },
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      return { ...token, ...user }
    },
    session: ({ session, token }) => {
      return { ...session, ...token }
    }
  },
});

import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextApiRequest, NextApiResponse } from 'next';

type CustomUser = User & {
  username: string;
  jwt: string;
};
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/sign-in'
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      name: 'Sign-in',

      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        //returns a User object
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`,
          {
            method: 'POST',
            body: new URLSearchParams({
              identifier: credentials?.email as string,
              password: credentials?.password as string
            })
          }
        );

        const data = await res.json();

        // Return null if user data could not be retrieved
        if (!data.user) return null;
        console.log('data-login', data);
        // Any object returned will be saved in `user` property of the JWT
        const user: CustomUser = {
          id: data.user.id.toString(),
          username: data.user.username,
          email: data.user.email,
          jwt: data.jwt
        };

        return user;
      }
    })
  ],
  session: {
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60 // 24 hours
  },
  jwt: {
    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET
  },
  callbacks: {
    //
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      // See session.user object for details to add custom properties
      return {
        ...session,
        user: {
          id: token.id as string, //custom
          jwt: token.jwt as string, //custom
          name: token.name as string,
          email: token.email as string
        }
      };
    },
    async jwt({ token, user }) {
      if (user) {
        //add any info to the token, so you can retrieve in the session calbakc and pass to the session
        const customUser: CustomUser = user as CustomUser;

        return {
          ...token,
          id: customUser.id,
          email: customUser.email,
          name: customUser.username as string,
          jwt: customUser.jwt
        };
      }

      return token;
    }
  }
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

export default Auth;

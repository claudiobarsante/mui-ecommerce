import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

async function protectedRoutes(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    context.res.setHeader(
      'Location',
      `/sign-in?callbackUrl=${context.resolvedUrl}`
    );
    context.res.statusCode = 302;
  }

  return session;
}

export default protectedRoutes;

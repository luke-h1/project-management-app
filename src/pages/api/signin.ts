import { withMethods } from '@frontend/utils/api-middlewares/withMethods';
import { comparePassword, createJWT } from '@frontend/utils/auth';
import { db } from '@frontend/utils/db';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const valid = await comparePassword(req.body.password, user?.password);

  if (!valid) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const jwt = await createJWT(user);
  res.setHeader(
    'Set-Cookie',
    serialize(process.env.COOKIE_NAME as string, jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // 7 days
    }),
  );

  return res.status(200).json(user);
};

export default withMethods(['POST'], handler);

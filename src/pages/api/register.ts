import { withMethods } from '@frontend/utils/api-middlewares/withMethods';
import { createJWT, hashPassword } from '@frontend/utils/auth';
import { db } from '@frontend/utils/db';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await db.user.create({
    data: {
      email: req.body.email,
      password: await hashPassword(req.body.password),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
  });

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
  return res.status(201).json(user);
};

export default withMethods(['POST'], handler);

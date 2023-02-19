import { withMethods } from '@frontend/utils/api-middlewares/withMethods';
import { validateJWT } from '@frontend/utils/auth';
import { db } from '@frontend/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await validateJWT(
    req.cookies[process.env.COOKIE_NAME] as string,
  );

  if (!user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const project = await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  });

  return res.status(201).json({
    project,
  });
};

export default withMethods(['POST'], handler);

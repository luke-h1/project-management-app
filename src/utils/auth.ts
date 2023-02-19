import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { jwtVerify, SignJWT } from 'jose';
import { ReadonlyRequestCookies } from 'next/dist/server/app-render';
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { db } from './db';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const createJWT = (user: User): Promise<string> => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 7 days

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET ?? 'yo'));
};

export const validateJWT = async (token: string) => {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET ?? 'yo'),
  );

  return payload as { id: string; email: string };
};

export const getUserFromCookie = async (
  cookies: RequestCookies | ReadonlyRequestCookies,
): Promise<User | null> => {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  const { id } = await validateJWT(jwt?.value as string);

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

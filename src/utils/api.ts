import { Project, User } from '@prisma/client';

interface FetcherOpts {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
  body?: unknown;
  json?: boolean;
}

export const fetcher = async <T>({
  method,
  url,
  body,
  json = true,
}: FetcherOpts): Promise<T | undefined> => {
  const res = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  if (json) {
    try {
      const data = await res.json();
      return data.data as T;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Error parsing JSON', e);
      return undefined;
    }
  }
  return undefined;
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginRequest = Omit<RegisterRequest, 'firstName' | 'lastName'>;

export const register = (user: RegisterRequest): Promise<User | undefined> => {
  return fetcher({
    url: '/api/register',
    method: 'POST',
    body: user,
  });
};

export const login = (user: LoginRequest): Promise<User | undefined> => {
  return fetcher({
    url: '/api/login',
    method: 'POST',
    body: user,
  });
};

export type ProjectCreateRequest = {
  name: string;
};

export const createNewProject = (
  name: string,
): Promise<Project | undefined> => {
  return fetcher({
    url: '/api/project',
    method: 'POST',
    body: { name },
  });
};

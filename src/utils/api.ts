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

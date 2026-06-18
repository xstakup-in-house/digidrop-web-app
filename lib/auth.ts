import { cookies } from 'next/headers';

export async function getToken() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('accessToken');
  if (!authToken) return null;
  return authToken.value;
}

export async function setToken(token: string) {
  const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day (24 hours)
  const cookieStore = await cookies();
  await cookieStore.set({
    name: 'accessToken',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure in prod
    sameSite: 'lax',
    path: '/',
    expires: expireAt,
  });
}

export async function setRefreshToken(refresh: string) {
  const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const cookieStore = await cookies();
  await cookieStore.set({
    name: 'refreshToken',
    value: refresh,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expireAt,
  });
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken');
  return refreshToken?.value || null;
}

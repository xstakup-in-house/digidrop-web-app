'use server'

import { apiClient } from "@/apiClient/client";
import { setRefreshToken, setToken } from "@/lib/auth";

export async function getNonce() {
    if (process.env.NODE_ENV === 'development') {
        return { nonce: "dev-mock-nonce-123", message: "Welcome to Digidrops!\n\nSign this message to verify ownership of your wallet.\n\nNonce: dev-mock-nonce-123" };
    }
    try {
        const res = await apiClient.get('/login', { withCredentials: true });
        return res.data
    } catch (error) {
        throw error || new Error("Nonce failed'")
    }
}

type LoginPayload = {
  walletAddress: string;
  signature: string;
  nonce: string;
  referral?: string;
};

export async function walletLogin(walletAddress: string, signature: string, nonce: string, ref?: string) {
  if (process.env.NODE_ENV === 'development') {
    const mockToken = "dev-mock-jwt-token";
    const mockRefresh = "dev-mock-refresh-token";
    await setToken(mockToken);
    await setRefreshToken(mockRefresh);
    return { token: mockToken, refresh: mockRefresh, user: { id: "dev-user-1", wallet: walletAddress } };
  }

  const payload: LoginPayload = {
    walletAddress,
    signature,
    nonce,
  };

  if (ref) payload.referral = ref;
  try {
    const { data } = await apiClient.post('/login', payload, { withCredentials: true }); // Use apiClient here
    await setToken(data.token); // Assuming you have setRefreshToken too if needed
    await setRefreshToken(data.refresh);
    return data;
  } catch (error: any) {
    console.error('walletLogin error');
    throw new Error('Login failed');
  }
}


type RequestPayload={
  names: string
  email: string
  avatar_url?: string | null
}

export async function updateProfile(payload:RequestPayload) {
  if (process.env.NODE_ENV === 'development') {
    return { success: true, names: payload.names, email: payload.email, avatar_url: payload.avatar_url };
  }
  try {
    const response = await apiClient.patch('/update-profile', payload);
    return response.data;
  } catch (error: any) {
    console.error(
      'Update profile failed:',
      error?.response?.data || error
    );

    throw new Error(
      error?.response?.data?.detail ||
      error?.response?.data?.error ||
      'Failed to update profile'
    );
  }
}
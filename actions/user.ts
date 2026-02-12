'use server'

import { apiClient } from "@/apiClient/client";
import { setRefreshToken, setToken } from "@/lib/auth";


export async function getNonce() {
    try {
        const res = await apiClient.get('/login', { withCredentials: true });
        return res.data
    } catch (error) {
        throw error || new Error("Nonce failed'")
    }
}

export async function walletLogin(walletAddress: string, signature: string, nonce: string, ref?:string) {
  const payload: any = {
  walletAddress,
  signature,
  nonce
};

if (ref) payload.preferral = ref;
console.log("login payload:", payload)
  try {
    const { data } = await apiClient.post('/login', payload, { withCredentials: true }); // Use apiClient here
    await setToken(data.token); // Assuming you have setRefreshToken too if needed
    await setRefreshToken(data.refresh);
    return data;
  } catch (error: any) {
    console.error('walletLogin error:', error.response?.data || error);
    throw new Error('Login failed');
  }
}


type RequestPayload={
  names: string
  email: string
  avatar_id: number
}

export async function updateProfile(payload:RequestPayload) {
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
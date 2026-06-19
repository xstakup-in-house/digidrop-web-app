'use server';

import { apiClient } from "@/apiClient/client"
import { startMockTask, completeMockTask } from "@/app/data/tasks/onsite-task"

type Payload={
    txHash: string,
    newPassId: number
    isUpgrade: boolean
}

export async function verifyPayment(payload:Payload) {
    if (process.env.NODE_ENV === 'development') {
        return { success: true, txHash: payload.txHash, newPassId: payload.newPassId };
    }
    try {
        const res = await apiClient.post('/verify/payment', payload)
        return res.data
    } catch (error:any) {
        console.error('payment verification error');
        throw new Error('Payment verification failed');
    }
}


export async function startTask(taskId: number) {
  if (process.env.NODE_ENV === 'development') {
    startMockTask(taskId);
    const mockLinks: Record<number, string> = {
      1: "https://x.com/Digidrops_xyz",
      2: "https://discord.gg/digidropsai",
      3: "/mint-pass"
    };
    return { redirect_url: mockLinks[taskId] || "https://x.com/Digidrops_xyz" };
  }
  try {
    const res = await apiClient.post(`/tasks/${taskId}/start`);
    return { ...res.data, redirect_url: res.data.external_link };
  } catch (error: any) {
    console.error('Start task error');
    throw new Error(
      error?.response?.data?.error || 'Failed to start task'
    );
  }
}

export async function completeTask(taskId: number) {
  if (process.env.NODE_ENV === 'development') {
    completeMockTask(taskId);
    return { success: true };
  }
  try {
    const res = await apiClient.post(`/tasks/${taskId}/completed`);
    return res.data;
  } catch (error: any) {
    console.error('Complete task error');
    throw new Error(
      error?.response?.data?.error || 'Failed to complete task'
    );
  }
}

'use server';

import { apiClient } from "@/apiClient/client";

export interface VerifyPaymentPayload {
  txHash: string;
  newPassId: number;
  isUpgrade: boolean;
}

export interface StartTaskResponse {
  task_type: "on_site" | "off_site";
  external_link: string;
  redirect_url: string;
}

export interface CompleteTaskResponse {
  success: boolean;
  points_awarded: number;
}

/**
 * Sends transaction hash and pass target details to the backend API to confirm and verify the payment on-chain.
 */
export async function verifyPayment(payload: VerifyPaymentPayload): Promise<{ success: boolean }> {
  try {
    const res = await apiClient.post('/verify/payment', payload);
    return res.data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Payment verification failed";
    console.error(`[verifyPayment] Error: ${message}`);
    throw new Error(message);
  }
}

/**
 * Notifies the backend to start a specific marketing quest task.
 */
export async function startTask(taskId: number): Promise<StartTaskResponse> {
  try {
    const res = await apiClient.post(`/tasks/${taskId}/start`);
    return { 
      task_type: res.data.task_type,
      external_link: res.data.external_link,
      redirect_url: res.data.external_link 
    };
  } catch (error: any) {
    const errMsg = error?.response?.data?.error || 'Failed to start task';
    console.error(`[startTask] Error: ${errMsg}`);
    throw new Error(errMsg);
  }
}

/**
 * Notifies the backend to check and verify quest completion status and award points.
 */
export async function completeTask(taskId: number): Promise<CompleteTaskResponse> {
  try {
    const res = await apiClient.post(`/tasks/${taskId}/completed`);
    return res.data;
  } catch (error: any) {
    const errMsg = error?.response?.data?.error || 'Failed to complete task';
    console.error(`[completeTask] Error: ${errMsg}`);
    throw new Error(errMsg);
  }
}

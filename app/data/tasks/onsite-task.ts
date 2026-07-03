import { apiClient } from "@/apiClient/client";
import { loginRequired } from "../users";
import { TaskResponse } from "@/types/response-type";

export async function getNewTasks(): Promise<TaskResponse[]> {
    await loginRequired()
    try {
        const res = await apiClient.get('/tasks/');
        return res.data;
    } catch (error) {
        console.error("API tasks error:", error);
        throw error;
    }
}
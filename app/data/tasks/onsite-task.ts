import { apiClient } from "@/apiClient/client";
import { loginRequired } from "../users";
import { TaskResponse } from "@/types/response-type";

const MOCK_TASKS: TaskResponse[] = [
  {
    id: 1,
    icon: "/assets_icon/1.webp",
    title: "Follow Digidrops on X / Twitter",
    points: 100,
    external_link: "https://x.com/Digidrops_xyz",
    task_type: "off_site",
    is_active: true,
    user_status: "pending"
  },
  {
    id: 2,
    icon: "/assets_icon/3.webp",
    title: "Join Digidrops Official Discord",
    points: 150,
    external_link: "https://discord.gg/digidropsai",
    task_type: "off_site",
    is_active: true,
    user_status: "pending"
  },
  {
    id: 3,
    icon: "/assets_icon/4.webp",
    title: "Verify your soulbound passport status",
    points: 200,
    external_link: "/mint-pass",
    task_type: "on_site",
    is_active: true,
    user_status: "pending"
  }
];

export function startMockTask(id: number) {
  const task = MOCK_TASKS.find(t => t.id === id);
  if (task) {
    task.user_status = 'started';
    task.started_at = new Date().toISOString();
  }
}

export function completeMockTask(id: number) {
  const task = MOCK_TASKS.find(t => t.id === id);
  if (task) {
    task.user_status = 'completed';
  }
}

export async function getNewTasks(): Promise<TaskResponse[]> {
    await loginRequired()
    if (process.env.NODE_ENV === 'development') {
        return MOCK_TASKS;
    }
    try {
        const res = await apiClient.get('/tasks/');
        return res.data;
    } catch (error) {
        console.error("API tasks error:", error);
        throw error;
    }
}
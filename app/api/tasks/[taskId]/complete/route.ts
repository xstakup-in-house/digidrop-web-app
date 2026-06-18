import { completeTask } from "@/actions/app";


export async function POST(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params
    const data = await completeTask(Number(taskId));
    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Failed to complete task" },
      { status: 400 }
    );
  }
}
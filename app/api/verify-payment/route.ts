import { verifyPayment } from "@/actions/app";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = await verifyPayment(payload);
    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Payment verification failed" },
      { status: 400 }
    );
  }
}

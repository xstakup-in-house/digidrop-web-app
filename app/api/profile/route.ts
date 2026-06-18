import { getProfile } from "@/app/data/profile/profile";

export async function GET() {  
    try {
        const data = await getProfile();
        return Response.json(data);
    } catch (error: any) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
}
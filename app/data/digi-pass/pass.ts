import { apiClient } from "@/apiClient/client"
import { DigiPass } from "@/types/response-type"

export const getDigiPasses = async () => {
    try {
        const entry_passes = await apiClient.get('/digi-passes')
        return entry_passes.data
    } catch (error) {
        throw error;
    }
}

export const getPassById = async (id: string): Promise<DigiPass> => {
    try {
        const single_pass = await apiClient.get(`/passes/${id}`)
        return single_pass.data
    } catch (error) {
        throw error;
    }
}
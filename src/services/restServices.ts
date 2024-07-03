import api from '@/services/axiosConfig';
import { Collaborator } from '@/interfaces/Collaborator';
import { CurrentCycle } from '@/interfaces/CurrentCycle';
import { toast } from 'react-toastify';

export const getAllCollaborators = async (userId: number): Promise<Collaborator[]> => {
    try {
        const response = await api.get(`/api/peer-review/collaborators/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os colaboradores:', error);
        return [];
    }
};

export const getCurrentCycle = async (): Promise<CurrentCycle> => {
    const response = await api.get('/api/cycles/current');
    return response.data;
}

export const postAv360 = async (av360Data: any, evaluatorId: number, cycleId: number): Promise<any> => {
    try {
        const dataToSend = Object.values(av360Data);
        await api.post(`/api/peer-review/register/${evaluatorId}/${cycleId}`, dataToSend);

        return true;
    } catch (error) {
        console.error('Error submitting data:', error);
        toast.error('Erro ao enviar os dados. Por favor, tente novamente.');
    }
}

export const getAv360Data = async (evaluatorId: number, cycleId: number) => {
    try {
        const response = await api.get(`/api/peer-review/${evaluatorId}/${cycleId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
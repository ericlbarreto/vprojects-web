import api from '@/services/axiosConfig';
import { Collaborator } from '@/interfaces/Collaborator';
import { CurrentCycle } from '@/interfaces/CurrentCycle';
import { toast } from 'react-toastify';
import { Av360 } from '@/interfaces/Av360';

export const getAllCollaboratorsByUserId = async (userId: number): Promise<Collaborator[]> => {
    try {
        const response = await api.get(`/api/peer-review/collaborators/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Erro ao buscar os colaboradores. Por favor, tente novamente.');
        return [];
    }
};

export const getAllCollaborators = async (): Promise<Collaborator[]> => {
    try {
        const response = await api.get(`/api/user/all-collabs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Erro ao buscar os colaboradores. Por favor, tente novamente.');
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
        toast.error('Erro ao buscar os dados. Por favor, tente novamente.');
    }
}

export const getReceivedAv360 = async (evaluatedId: number, cycleId: number): Promise<Av360[] | undefined> => {
    try {
        const response = await api.get(`/api/peer-review/peer-review-evaluated/${evaluatedId}/${cycleId}`);
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Erro ao buscar os dados. Por favor, tente novamente.');
    }
}
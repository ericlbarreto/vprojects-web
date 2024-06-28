import api from '@/services/axiosConfig';
import { Collaborator } from '@/interfaces/Collaborator';
import { CurrentCycle } from '@/interfaces/CurrentCycle';

export const getAllCollaborators = async (): Promise<Collaborator[]> => {
    try {
        const response = await api.get('/api/user/all-collabs');
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
import SelectColab from "@/components/selectColab";
import SubHeaderAv from "@/components/subHeaderAv";
import Tutorial360 from "@/components/tutorial360";
import { Collaborator } from "@/interfaces/Collaborator";
import { useEffect, useState } from "react";
import api from "@/services/axiosConfig";

function Avaliacao360() {
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

    useEffect(() => {
        const getCollabs = async () => {
            try {
                const response = await api.get('/api/user/all-collabs');
                setCollaborators(response.data);
            } catch (error) {
                console.error('Erro ao buscar os colaboradores:', error);
            }
        }

        getCollabs();

    }, []);

    return (
        <div className="h-screen">
            <SubHeaderAv />
            <div className="pt-32">
                <Tutorial360 />
                <div className="m-4">
                    <p className="font-medium text-lg">Adicione aqui os colaboradores</p>
                    <SelectColab collaborators={collaborators} />
                </div>
            </div>
        </div>
    );
}

export default Avaliacao360;

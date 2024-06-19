import SelectColab from "@/components/selectColab";
import SubHeaderAv from "@/components/subHeaderAv";
import Tutorial360 from "@/components/tutorial360";
import { Collaborator } from "@/interfaces/Collaborator";
import { useEffect, useState } from "react";
import api from "@/services/axiosConfig";
import Card360 from "@/components/card360";

function Avaliacao360() {
    const [availableCollaborators, setAvailableCollaborators] = useState<Collaborator[]>([]);
    const [selectedCollaborators, setSelectedCollaborators] = useState<Collaborator[]>([]);
    const [expandedCollaborators, setExpandedCollaborators] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const getCollabs = async () => {
            try {
                const response = await api.get('/api/user/all-collabs');
                setAvailableCollaborators(response.data);
            } catch (error) {
                console.error('Erro ao buscar os colaboradores:', error);
            }
        };

        getCollabs();
    }, []);

    const handleSelectCollaborator = (collaborator: Collaborator) => {
        setSelectedCollaborators([...selectedCollaborators, collaborator]);
        setAvailableCollaborators(availableCollaborators.filter(collab => collab.id !== collaborator.id));
    };

    const handleRemoveCollaborator = (collaborator: Collaborator) => {
        setAvailableCollaborators([...availableCollaborators, collaborator]);
        setSelectedCollaborators(selectedCollaborators.filter(collab => collab.id !== collaborator.id));
    };

    const toggleExpand = (id: number) => {
        setExpandedCollaborators(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div className="h-screen">
            <SubHeaderAv />
            <div className="pt-32">
                <Tutorial360 />
                {availableCollaborators.length > 0 &&
                    <div className="m-4">
                        <p className="font-medium text-lg">Adicione aqui os colaboradores</p>
                        <SelectColab collaborators={availableCollaborators} onSelect={handleSelectCollaborator} />
                    </div>
                }
                <div className="m-4">
                    {selectedCollaborators.map(collaborator => (
                        <Card360
                            key={collaborator.id}
                            collaborator={collaborator}
                            onRemove={handleRemoveCollaborator}
                            onExpandToggle={toggleExpand}
                            isExpanded={expandedCollaborators[collaborator.id]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Avaliacao360;

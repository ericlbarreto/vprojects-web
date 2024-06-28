import SelectColab from "@/components/selectColab";
import SubHeaderAv from "@/components/subHeaderAv";
import Tutorial360 from "@/components/tutorial360";
import { Collaborator } from "@/interfaces/Collaborator";
import { useEffect, useState } from "react";
import api from "@/services/axiosConfig";
import Card360 from "@/components/card360";
import { Av360 } from "@/interfaces/Av360";

function Avaliacao360() {
    const [availableCollaborators, setAvailableCollaborators] = useState<Collaborator[]>([]);
    const [selectedCollaborators, setSelectedCollaborators] = useState<Collaborator[]>([]);
    const [expandedCollaborators, setExpandedCollaborators] = useState<{ [key: number]: boolean }>({});
    const [av360Data, setAv360Data] = useState<{ [key: number]: Av360 }>({});

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
        setAv360Data(prevState => ({
            ...prevState,
            [collaborator.id]: {
                evaluatorId: 1,
                evaluatedId: collaborator.id,
                cycleId: 1,
                assessment: {
                    behavior: 0,
                    tecniques: 0,
                    toImprove: "",
                    toPraise: ""
                }
            }
        }));
    };

    const handleRemoveCollaborator = (collaborator: Collaborator) => {
        setAvailableCollaborators([...availableCollaborators, collaborator]);
        setSelectedCollaborators(selectedCollaborators.filter(collab => collab.id !== collaborator.id));
        setAv360Data(prevState => {
            const newState = { ...prevState };
            delete newState[collaborator.id];
            return newState;
        });
    };

    const toggleExpand = (id: number) => {
        setExpandedCollaborators(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log('teste ', av360Data);
            const dataToSend = Object.values(av360Data);
            await api.post('/api/avaliacao360', dataToSend);
            console.log('Dados enviados com sucesso:', dataToSend);
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    const handleAv360FieldChange = (collaboratorId: number, field: string, value: any) => {
        setAv360Data(prevState => ({
            ...prevState,
            [collaboratorId]: {
                ...prevState[collaboratorId],
                assessment: {
                    ...prevState[collaboratorId].assessment,
                    [field]: value
                }
            }
        }));
    };

    const [atencao, setAtencao] = useState(false);

    return (
        <div className="h-screen">
            <SubHeaderAv currentStep={2} atencao={atencao} setAtencao={setAtencao}/>
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
                            onAv360FieldChange={handleAv360FieldChange}
                            av360Data={av360Data}
                        />
                    ))}
                </div>
                <div className="m-4">
                    <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded">Enviar Avaliações</button>
                </div>
            </div>
        </div>
    );
}

export default Avaliacao360;

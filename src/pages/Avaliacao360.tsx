import SelectColab from "@/components/selectColab";
import SubHeaderAv from "@/components/subHeaderAv";
import Tutorial360 from "@/components/tutorial360";
import { Collaborator } from "@/interfaces/Collaborator";
import { useEffect, useState } from "react";
import api from "@/services/axiosConfig";
import Card360 from "@/components/card360";
import { Av360 } from "@/interfaces/Av360";
import { useAuth } from "@/contexts/authContext";
import { getAllCollaborators, getCurrentCycle } from "@/services/restServices";
import { CurrentCycle } from "@/interfaces/CurrentCycle";

function Avaliacao360() {
    const [availableCollaborators, setAvailableCollaborators] = useState<Collaborator[]>([]);
    const [selectedCollaborators, setSelectedCollaborators] = useState<Collaborator[]>([]);
    const [expandedCollaborators, setExpandedCollaborators] = useState<{ [key: number]: boolean }>({});
    const [av360Data, setAv360Data] = useState<{ [key: number]: Av360 }>({});
    const [currentCycle, setCurrentCycle] = useState<CurrentCycle>();

    const { getUserData } = useAuth();
    const user = getUserData();

    useEffect(() => {
        const fetchCollaborators = async () => {
            const collaborators = await getAllCollaborators();
            const filteredCollaborators = collaborators.filter((collab: Collaborator) => collab.id !== user!.id);
            setAvailableCollaborators(filteredCollaborators);
        };

        fetchCollaborators();
    }, []);

    useEffect(() => {
        const fetchCurrentCyle = async () => {
            const currentCycle = await getCurrentCycle();
            setCurrentCycle(currentCycle);
        }

        fetchCurrentCyle();
    }, []);


    const handleSelectCollaborator = (collaborator: Collaborator) => {
        setSelectedCollaborators([...selectedCollaborators, collaborator]);
        setAvailableCollaborators(availableCollaborators.filter(collab => collab.id !== collaborator.id));
        setAv360Data(prevState => ({
            ...prevState,
            [collaborator.id]: {
                evaluatorId: user!.id,
                evaluatedId: collaborator.id,
                cycleId: currentCycle!.id,
                assessment: {
                    idReview: null,
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
            await api.post('/api/peer-review/register/1/1', dataToSend);
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
            <SubHeaderAv currentStep={2} atencao={atencao} setAtencao={setAtencao} />
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

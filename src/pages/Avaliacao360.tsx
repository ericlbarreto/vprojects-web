import SelectColab from "@/components/selectColab";
import SubHeaderAv from "@/components/subHeaderAv";
import Tutorial360 from "@/components/tutorial360";
import { Collaborator } from "@/interfaces/Collaborator";
import { useEffect, useState } from "react";
import Card360 from "@/components/card360";
import { Av360 } from "@/interfaces/Av360";
import { useAuth } from "@/contexts/authContext";
import { getAllCollaborators, getAv360Data, getCurrentCycle, postAv360 } from "@/services/restServices";
import { CurrentCycle } from "@/interfaces/CurrentCycle";
import { Oval } from "react-loader-spinner";
import AtencaoModal from "@/components/atencao";

function Avaliacao360() {
    const [availableCollaborators, setAvailableCollaborators] = useState<Collaborator[]>([]);
    const [selectedCollaborators, setSelectedCollaborators] = useState<Collaborator[]>([]);
    const [expandedCollaborators, setExpandedCollaborators] = useState<{ [key: number]: boolean }>({});
    const [av360Data, setAv360Data] = useState<{ [key: number]: Av360 }>({});
    const [currentCycle, setCurrentCycle] = useState<CurrentCycle>();
    const [disableAddCollab, setDisableAddCollab] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const { getUserData } = useAuth();
    const user = getUserData();

    useEffect(() => {
        const fetchCollaborators = async () => {
            const collaborators = await getAllCollaborators(user!.id);
            setAvailableCollaborators(collaborators);
        };

        if (user) {
            fetchCollaborators();
        }
    }, []);

    useEffect(() => {
        const fetchCurrentCycle = async () => {
            const currentCycle = await getCurrentCycle();
            setCurrentCycle(currentCycle);
        }

        fetchCurrentCycle();
    }, []);

    useEffect(() => {
        setDisableAddCollab(availableCollaborators.length === 0);
    }, [availableCollaborators]);

    useEffect(() => {
        const fetchAv360Data = async () => {
            setLoading(true);
            try {
                const response = await getAv360Data(user!.id, currentCycle!.id);
                const av360DataMap = response.reduce((acc: { [key: number]: Av360 }, item: any) => {
                    acc[item.evaluatedId] = {
                        evaluatorId: item.evaluatorId,
                        evaluatedId: item.evaluatedId,
                        cycleId: item.cycleId,
                        assessment: {
                            idReview: item.PeerReviewScores.id,
                            behavior: item.PeerReviewScores.behavior,
                            tecniques: item.PeerReviewScores.tecniques,
                            toImprove: item.PeerReviewScores.toImprove,
                            toPraise: item.PeerReviewScores.toPraise
                        }
                    };
                    return acc;
                }, {});
                setAv360Data(av360DataMap);

                const selectedCollabs = availableCollaborators.filter(collab => av360DataMap[collab.id]);
                setSelectedCollaborators(selectedCollabs);

                const newAvailableCollaborators = availableCollaborators.filter(collab => !av360DataMap[collab.id]);
                setAvailableCollaborators(newAvailableCollaborators);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchAv360Data();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [user?.id, currentCycle?.id]);


    const handleSelectCollaborator = (collaborator: Collaborator) => {
        setSelectedCollaborators([...selectedCollaborators, collaborator]);
        setAvailableCollaborators(prev => prev.filter(collab => collab.id !== collaborator.id));
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
        setAvailableCollaborators(prev => [...prev, collaborator]);
        setSelectedCollaborators(prev => prev.filter(collab => collab.id !== collaborator.id));
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
        await postAv360(av360Data, user!.id, currentCycle!.id)
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

    if (loading) {
        return <div className="h-screen flex justify-center items-center"><Oval color="blue" height="80"
            width="80" /></div>;
    }

    return (
        <div className="h-screen">
            <SubHeaderAv currentStep={2} atencao={atencao} setAtencao={setAtencao} />
            <div className="pt-32">
                <div className="flex justify-center">{atencao && (<AtencaoModal setAtencao={setAtencao} atencao={atencao} path="/autoavaliacao" />)}</div>
                <div className={atencao ? "opacity-50" : ""}>
                    <Tutorial360 />
                    <div className="m-4">
                        <p className="font-medium text-lg">Adicione aqui os colaboradores</p>
                        <SelectColab collaborators={availableCollaborators} onSelect={handleSelectCollaborator} disableAddCollab={disableAddCollab} />
                    </div>
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
        </div>
    );
}

export default Avaliacao360;

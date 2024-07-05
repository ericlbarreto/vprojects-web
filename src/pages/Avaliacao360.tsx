import SelectColab from "@/components/selectColab";
import SubHeaderAv from "@/components/subHeaderAv";
import Tutorial360 from "@/components/tutorial360";
import { Collaborator } from "@/interfaces/Collaborator";
import { useEffect, useState } from "react";
import Card360 from "@/components/card360";
import { Av360 } from "@/interfaces/Av360";
import { useAuth } from "@/contexts/authContext";
import { getAllCollaboratorsByUserId, getAv360Data, getCurrentCycle } from "@/services/restServices";
import { CurrentCycle } from "@/interfaces/CurrentCycle";
import { Oval } from "react-loader-spinner";
import AtencaoModal from "@/components/atencao";
import DoneCycle from "@/components/doneCycleModal";

function Avaliacao360() {
    const [availableCollaborators, setAvailableCollaborators] = useState<Collaborator[]>([]);
    const [selectedCollaborators, setSelectedCollaborators] = useState<Collaborator[]>([]);
    const [expandedCollaborators, setExpandedCollaborators] = useState<{ [key: number]: boolean }>({});
    const [av360Data, setAv360Data] = useState<{ [key: number]: Av360 }>({});
    const [currentCycle, setCurrentCycle] = useState<CurrentCycle>();
    const [disableAddCollab, setDisableAddCollab] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [atencao, setAtencao] = useState(false);
    const [doneCycle, setDoneCycle] = useState(false);

    const { getUserData } = useAuth();
    const user = getUserData();

    const queryParams = new URLSearchParams(location.search);
    const idCycleParam = queryParams.get("cycleId");
    const isFinishedParam = queryParams.get("isFinished");

    useEffect(() => {
        const fetchCollaborators = async () => {
            const collaborators = await getAllCollaboratorsByUserId(user!.id);
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
        if (availableCollaborators) {
            setDisableAddCollab(availableCollaborators.length === 0);
        }
    }, [availableCollaborators]);


    useEffect(() => {
        const fetchAv360Data = async () => {
            setLoading(true);
            try {
                const response = await getAv360Data(user!.id, isFinishedParam === "true" ? Number(idCycleParam) : currentCycle!.id);
                const av360DataMap = response!.reduce((acc: { [key: number]: Av360 }, item: any) => {
                    acc[item.evaluatedId] = {
                        evaluatorId: item.evaluatorId,
                        evaluatedId: item.evaluatedId,
                        cycleId: item.cycleId,
                        isFinished: item.isFinished,
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
                isFinished: false,
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

    const handleAv360StatusChange = (id: number, isFinished: boolean) => {
        setAv360Data((prevData) => ({
            ...prevData,
            [id]: {
                ...prevData[id],
                isFinished,
            },
        }));
    };

    const allFieldsFilled = () => {
        for (const collaborator of [...selectedCollaborators, ...availableCollaborators]) {
            const av360 = av360Data[collaborator.id];
            if (
                !av360 ||
                !av360.assessment ||
                av360.assessment.behavior === 0 ||
                av360.assessment.tecniques === 0 ||
                av360.assessment.toImprove === "" ||
                av360.assessment.toPraise === ""
            ) {
                return false;
            }
        }
        return true;
    };

    const handleSubmitCycle = async (submitted: boolean) => {
        setDoneCycle(submitted);
    };

    if (loading) {
        return <div className="h-screen flex justify-center items-center"><Oval color="blue" height="80"
            width="80" /></div>;
    }

    return (
        <div className="h-screen">
            <SubHeaderAv
                currentStep={2}
                atencao={atencao}
                setAtencao={setAtencao}
                allFieldsFilled={allFieldsFilled()}
                user={user!}
                currentCycle={currentCycle}
                av360Data={av360Data}
                onSubmitCycle={handleSubmitCycle}
            />
            <div className="pt-32">
                <div className="flex justify-center">{atencao && (<AtencaoModal setAtencao={setAtencao} atencao={atencao} path="/autoavaliacao" />)}</div>
                <div className="flex justify-center">
                    {doneCycle && <DoneCycle setDoneCycle={setDoneCycle} currentCycle={currentCycle!} av360Data={av360Data} />}
                </div>
                <div className={atencao || doneCycle ? "opacity-50" : ""}>
                    <Tutorial360 />
                    {(idCycleParam ? (currentCycle!.id === Number(idCycleParam)) : true) && (
                        <div className="m-4">
                            <p className="font-medium text-lg">Adicione aqui os colaboradores</p>
                            <SelectColab collaborators={availableCollaborators} onSelect={handleSelectCollaborator} disableAddCollab={disableAddCollab} />
                        </div>
                    )}
                    <div className="m-4">
                        {selectedCollaborators.map(collaborator => (
                            <Card360
                                key={collaborator.id}
                                collaborator={collaborator}
                                onRemove={handleRemoveCollaborator}
                                onExpandToggle={toggleExpand}
                                isExpanded={expandedCollaborators[collaborator.id] || false}
                                onAv360FieldChange={handleAv360FieldChange}
                                onAv360StatusChange={handleAv360StatusChange}
                                av360Data={av360Data}
                                isFinished={isFinishedParam === "true" ? true : false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Avaliacao360;

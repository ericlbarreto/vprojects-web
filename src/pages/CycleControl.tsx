import { Payment, columns } from "@/components/cycleControlTable/columns";
import { CycleControlTable } from "@/components/cycleControlTable/data-table";
import SubHeaderEqualization from "@/components/subHeaderCycleControl";
import TutorialPartner from "@/components/tutorialPartner";
// import { User } from "@/interfaces/User";
import { Cycle } from "@/interfaces/Cycle";
import { User } from "@/interfaces/User";
import AtencaoModal from "@/components/atencao";
import FinishEqualization from "@/components/finishEqualization";
import SuccesToast from "@/components/succesToast";
// import { Collaborator } from "@/interfaces/Collaborator";
import api from "@/services/axiosConfig";
import { useEffect, useState } from "react";

const datatable: Payment[] = [
    // {
    //   id: "m5gr84i9",
    //   name: "Marina da Silva Brito", 
    //   grade: 5, 
    //   sector: "Produto e Gestão de Projetos", 
    //   role: "UI/UX Design", 
    //   status: "Finalizado",
    // },
    // {
    //     id: "3u1reuv4",
    //     name: "Breno Gabriel", 
    //     grade: 10, 
    //     sector: "Executivos e Liderança", 
    //     role: "Desenvolvedor fullstack", 
    //     status: "Não iniciado",
    // },
    // {
    //     id: "3u1reuv4",
    //     name: "Breno Gabriel", 
    //     grade: 10, 
    //     sector: "Infraestrutura e Operações", 
    //     role: "Desenvolvedor fullstack", 
    //     status: "Não iniciado",
    // },
    // {
    //     id: "3u1reuv4",
    //     name: "Breno Gabriel", 
    //     grade: 10, 
    //     sector: "Ciência de Dados e Análise", 
    //     role: "Desenvolvedor fullstack", 
    //     status: "Não iniciado",
    // }
]

function CycleControl() {

    const [Colab, setColab] = useState<User[]>([]);
    const [currentCycle, setCurrentCycle] = useState<Cycle | undefined>()
    const [finishingEqualization, setFinishingEqualization] = useState(false);
    const [finishNegate, setFinishNegate] = useState(false);
    

    useEffect(() => {
        const getCollaborator = async () => {
            try {
                const response = await api.get("/api/user/all-collabs");
                setColab(response.data);
            } catch (error) {
                console.error("Erro ao buscar os colaboradores:", error);
            }
        };

        getCollaborator();
    }, []);


    useEffect(() => {
        const getCurrentCycle = async () => {
            try {
                const cycleEqualizationIdResponse = await api.get("/api/cycles-equalization");
                const cycleEqualizationId = cycleEqualizationIdResponse.data;

                // console.log(cycleEqualizationId)
    
                const cycleEqualizationsResponse = await api.get("/api/cycles-equalization/all");
                const cycleEqualizations = cycleEqualizationsResponse.data;

                // console.log(cycleEqualizations)
    
                const currentCycle = cycleEqualizations.find((cycle: any) => cycle.id === cycleEqualizationId);
                
                // console.log(currentCycle)

                if (currentCycle) {
                    setCurrentCycle(currentCycle);
                } else {
                    console.error(`Ciclo com ID ${cycleEqualizationId} não encontrado.`);
                }
            } catch (error) {
                console.error("Erro ao buscar o ciclo:", error);
            }
        };

        getCurrentCycle();
    }, []);


    // console.log(Colab)

    const [path, setPath] = useState("/home-socio")
    const [atencao, setAtencao] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const idCycleEqParam = queryParams.get("cycleIdEq");
    const isFinishedParam = queryParams.get("isFinished");

    

    return (
        <div className="h-full bg-azulBackground">
            <div className="h-36">
                <SubHeaderEqualization setAtencao={setAtencao} atencao={atencao} currentCycle={currentCycle} cycleId = {idCycleEqParam ? idCycleEqParam : currentCycle?.id} setFinishingEqualization = {setFinishingEqualization} setFinishNegate = {setFinishNegate}/>
            </div>
            <div className="flex justify-center">{atencao && (<AtencaoModal setAtencao={setAtencao} atencao={atencao} path={path} />)}</div>
            <div className={atencao ? "opacity-50" : ""}></div>
            <div className="flex justify-center">{finishingEqualization && (<FinishEqualization setFinishingEqualization={setFinishingEqualization} finishingEqualization={finishingEqualization} cycleId = {idCycleEqParam ? idCycleEqParam : currentCycle?.id} path={path} />)}</div>
            <div className={atencao ? "opacity-50" : ""}></div>
            <TutorialPartner />
            <div className="mt-14 bg-white rounded-2xl shadow-md mx-16">
            {currentCycle && (
                <CycleControlTable columns={columns} data={Colab} idCycleEqParam = {idCycleEqParam ? idCycleEqParam : currentCycle.id} isFinishedParam = {isFinishedParam ? isFinishedParam : false}/>
            )}
            </div>
            <SuccesToast />
        </div>
    );
}

export default CycleControl;

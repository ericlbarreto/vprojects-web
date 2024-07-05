import SubHeaderEqualization from "@/components/subHeaderCycleControl";
import TutorialPartner from "@/components/tutorialPartner";
import { CycleControlTable } from "@/components/cycleControlTable/data-table";
import { Payment, columns } from "@/components/cycleControlTable/columns";
import { User } from "@/interfaces/User";
import { Cycle } from "@/interfaces/Cycle";
import { useEffect, useState } from "react";
import api from "@/services/axiosConfig";
import AtencaoModal from "@/components/atencao";
import FinishEqualization from "@/components/finishEqualization";
import SuccesToast from "@/components/succesToast";
import { toast } from "react-toastify";

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

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const doneToast = queryParams.get("doneToast");

        if (doneToast) {
            toast.success("Enviado o ciclo de avaliações", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: { background: "#E4FFE4", width: "320px" },
            });
        }
    }, [location.search]);

    const [Colab, setColab] = useState<User[]>([]);
    const [currentCycle, setCurrentCycle] = useState<Cycle>()

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

                console.log(cycleEqualizationId)

                const cycleEqualizationsResponse = await api.get("/api/cycles-equalization/all");
                const cycleEqualizations = cycleEqualizationsResponse.data;

                console.log(cycleEqualizations)

                // Encontrar o ciclo com o ID específico
                const currentCycle = cycleEqualizations.find((cycle: any) => cycle.id === cycleEqualizationId);

                console.log(currentCycle)

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


    console.log(Colab)

    const [path, setPath] = useState("/home-socio")
    const [atencao, setAtencao] = useState(false);
    const [elementVisible, setElementVisible] = useState(false);


    return (
        <div className="h-full bg-azulBackground">
            <div className="h-36">
                <SubHeaderEqualization setAtencao={setAtencao} atencao={atencao} currentCycle={currentCycle} />
            </div>
            <div className="flex justify-center">{atencao && (<AtencaoModal setAtencao={setAtencao} atencao={atencao} path={path} />)}</div>
            <div className={atencao ? "opacity-50" : ""}></div>
            <div className="flex justify-center">{elementVisible && (<FinishEqualization setElementVisible={setElementVisible} elementVisible={elementVisible} path={path} />)}</div>
            <div className={atencao ? "opacity-50" : ""}></div>
            <TutorialPartner />
            <div className="mt-14 bg-white rounded-2xl shadow-md mx-16">
                <CycleControlTable columns={columns} data={Colab} />
            </div>
            <SuccesToast />
        </div>
    );
}

export default CycleControl;

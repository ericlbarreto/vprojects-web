import SubHeaderEqualization from "@/components/subHeaderCycleControl";
import { useState } from "react";
import TutorialEqAv from "@/components/tutorialEqAv";
import EqAutoAv from "@/components/eqAutoAv";
import EqAv360 from "@/components/eqAv360";
import AtencaoModal from "@/components/atencao";
import api from "@/services/axiosConfig";
import { useAuth } from "@/contexts/authContext";
import DoneCycle from "@/components/doneCycleEq";
import { format } from 'date-fns';

function Equalization() {
    
    const { getUserData } = useAuth();
    const user = getUserData();
    const complete = () => {
        return Object.values(notasSocio).every(value => value !== 0);
    }

    const [notasSocio, setNota] = useState<{ [key: string]: number }>({
        "notaSentimentoDono": 0,
        "notaResiliencia": 0,
        "notaOrganizacao": 0,
        "notaAprender": 0,
        "notaTeamPlayer": 0,
        "notaQualidade": 0,
        "notaPrazo": 0,
        "notaMaiscomMenos": 0,
        "notaForadaCaixa": 0
    })

    const updateNota = (nota: string, newValue: number) => {
        setNota(previousState => {
            return {
                ...previousState, [nota]: newValue
            }
        });
    }

    const [doneCycle, setDoneCycle] = useState(false);


    const queryParams = new URLSearchParams(location.search);
    const idCycleEqParam = queryParams.get("cycleIdEq");
    const isFinishedParam = queryParams.get("isFinished");
    const colabId = queryParams.get("colabId");

    const prosseguirOuSalvarRascClick = async (isSaving: boolean) => {
        if (complete() || isSaving) {
            const cycleEqualizationId = idCycleEqParam? idCycleEqParam : (await api.get("/api/cycles-equalization")).data;
            const eqId = (await api.get(`/api/equalization/user/${user?.id}`)).data;
            const autoAvId = (await api.get(`/api/self-assesment/user/${colabId}`)).data;
            const cycleId = (await api.get(`/api/self-assesment/${autoAvId}`)).data.cycleId;
            console.log(cycleId)

            if (eqId !== 0) {
                try {
                    const scores = Object.keys(notasSocio).map((key, index) => ({
                        equalizationId: eqId,
                        criterionId: index + 1,
                        grade: notasSocio[key],
                    }));

                    await api.patch(`/api/equalization/${eqId}`, {
                        "evaluatorId": user?.id,
                        "evaluatedId": Number(colabId),
                        "cycleId": cycleId,
                        "cycleEqualizationId": Number(cycleEqualizationId),
                        "status": !isSaving,
                        "scores": scores
                    });
                    console.log(`patch feito:${scores}`)
                } catch (error) {
                    console.error(' Erro no patch. Ocorreu um erro ao fazer a requisição:', error);
                }
            }
            else {
                try {
                    const scores = Object.keys(notasSocio).map((key, index) => ({
                        criterionId: index + 1,
                        grade: notasSocio[key],
                    }));

                    await api.post(`/api/equalization`, {
                        "evaluatorId": user?.id,
                        "evaluatedId": Number(colabId),
                        "cycleId": cycleId,
                        "cycleEqualizationId": Number(cycleEqualizationId),
                        "status": !isSaving,
                        "scores": scores

                    });
                } catch (error) {
                    console.error('Erro no post. Ocorreu um erro ao fazer a requisição:', error);
                }

            }
            if (!isSaving) {
                const cycleEqualizationsResponse = await api.get("/api/cycles-equalization/all");
                const cycleEqualizations = cycleEqualizationsResponse.data;
                const currentCycle = cycleEqualizations.find((cycle: any) => cycle.id === cycleEqualizationId);
                const formattedEndDate = format(new Date(currentCycle.endDate), 'dd/MM/yyyy');
                const collaboratorResponse = (await api.get(`/api/user/${colabId}`)).data.name;


                if(currentCycle){
                    <DoneCycle setDoneCycle={setDoneCycle} endDate ={formattedEndDate} name={collaboratorResponse}  />
                }
                
            }

        }
        else {
            console.log("Não está totalmente preenchido")
        }

    };



    const [isSelfAval, setisSelfAval] = useState(true)
    const [atencao, setAtencao] = useState(false);
    const [path, setPath] = useState("")


    return (
        <div className={`h-full bg-azulBackground w-full ${atencao ? "fixed" : "relative"}`}>
            <SubHeaderEqualization isSelfAval={isSelfAval} funcaoSalvarOuFinalizar={prosseguirOuSalvarRascClick} setAtencao={setAtencao} atencao = {atencao}/>
            <div className={`pt-48 {atencao ? "opacity-50" : ""`}>
                <div className="flex justify-center">{atencao && (<AtencaoModal setAtencao={setAtencao} atencao={atencao} path={path} />)}</div>
                <TutorialEqAv />
            </div>
            <div className="flex bg-branco w-80 h-16 ml-4 justify-between items-center shadow rounded-md">
                <div className="flex"><button className={`p-3 ml-2 h-12 ${!isSelfAval ? "" : "rounded-md font-semibold bg-[#F1F7FF] text-roxoPrincipal"}`} onClick={() => setisSelfAval(true)}>Autoavaliação</button></div>
                <div className="flex"><button className={`p-3 mr-2 h-12 ${isSelfAval ? "" : "rounded-md font-semibold bg-[#F1F7FF] text-roxoPrincipal"}`} onClick={() => setisSelfAval(false)}>Avaliação 360</button></div>
            </div>
            {isSelfAval ? <EqAutoAv notasSocio={notasSocio} updateNota={updateNota} isFinished={isFinishedParam === "true"? true:false} colabId={colabId ? colabId : ''} /> : <EqAv360 />}
        </div>
    );

}


export default Equalization;
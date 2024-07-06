import SubHeaderEqualization from "@/components/subHeaderCycleControl";
import { useState } from "react";
import TutorialEqAv from "@/components/tutorialEqAv";
import EqAutoAv from "@/components/eqAutoAv";
import EqAv360 from "@/components/eqAv360";
import AtencaoModal from "@/components/atencao";
import api from "@/services/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";




function Equalization() {
    
    const { getUserData } = useAuth();
    const user = getUserData();
    const navigate = useNavigate();
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

    const queryParams = new URLSearchParams(location.search);
    const idCycleEqParam = queryParams.get("cycleIdEq");
    const isFinishedParam = queryParams.get("isFinished");

    const prosseguirOuSalvarRascClick = async (isSaving: boolean) => {
        if (complete() || isSaving) {
            const cycleEqualizationId = idCycleEqParam? idCycleEqParam : (await api.get("/api/cycles-equalization")).data;//colocar .id?
            const eqId = (await api.get(`/api/equalization/user/${user?.id}`)).data;
            const autoAvId = (await api.get(`/api/self-assesment/user/${1}`)).data; //colocar id do colab
            const cycleId = (await api.get(`/api/self-assesment/${autoAvId}`)).data[0].cycleId;

            if (eqId) {
                try {
                    const scores = Object.keys(notasSocio).map((key, index) => ({
                        equalizationId: eqId,
                        criterionId: index + 1,
                        grade: notasSocio[key],
                    }));

                    await api.patch(`/api/self-assesment/${autoAvId}`, {
                        "evaluatorId": user?.id,
                        "evaluatedId": 1,//colocaridocolab
                        "cycleId": cycleId,
                        "cycleEqualizationId": cycleEqualizationId,
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

                    await api.post(`/api/self-assesment`, {
                        "evaluatorId": user?.id,
                        "evaluatedId": 1,//colocar id do colab
                        "cycleId": cycleId,
                        "cycleEqualizationId": cycleEqualizationId,
                        "status": !isSaving,
                        "scores": scores

                    });
                } catch (error) {
                    console.error('Erro no post. Ocorreu um erro ao fazer a requisição:', error);
                }

            }
            if (!isSaving) {
                //colocartoast
                navigate("/home-socio?doneToast=true");
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
            {isSelfAval ? <EqAutoAv notasSocio={notasSocio} updateNota={updateNota} isFinished={isFinishedParam === "true"? true:false} /> : <EqAv360 />}
        </div>
    );

}


export default Equalization;
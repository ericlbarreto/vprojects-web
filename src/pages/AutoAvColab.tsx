import SubHeaderAv from "@/components/subHeaderAv";
import Tutorial from "@/components/tutorial";
import NotasJustif from "@/components/notasJustif";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AtencaoModal from "@/components/atencao";
import { useAuth } from "@/contexts/authContext";
import api from "@/services/axiosConfig";
import { SelfAssessmentScore } from "@/interfaces/SelfAssessmentScore";



function AutoAvColab() {
    const [path, setPath] = useState("/")
    const [atencao, setAtencao] = useState(false);
    const [notas, setNotas] = useState<{ [key: string]: number }>({
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

    const [justif, setJustif] = useState<{ [key: string]: string }>({
        "justSentimentoDono": "",
        "justResiliencia": "",
        "justOrganizacao": "",
        "justAprender": "",
        "justTeamPlayer": "",
        "justQualidade": "",
        "justPrazo": "",
        "justMaiscomMenos": "",
        "justForadaCaixa": ""
    })

    const justKeys = [
        "justSentimentoDono",
        "justResiliencia",
        "justOrganizacao",
        "justAprender",
        "justTeamPlayer",
        "justQualidade",
        "justPrazo",
        "justMaiscomMenos",
        "justForadaCaixa"
    ];

    const updateNota = (nota: string, newValue: number) => {
        setNotas(previousState => {
            return {
                ...previousState, [nota]: newValue
            }
        });
    }

    const updateJust = (just: string, newValue: string) => {
        setJustif(previousState => {
            return {
                ...previousState, [just]: newValue
            }
        });
    }

    const { getUserData } = useAuth();
    const user = getUserData();

    const navigate = useNavigate();

    const complete = () => {
        return Object.values(justif).every(value => value !== "") && Object.values(notas).every(value => value !== 0);
    }

    const queryParams = new URLSearchParams(location.search);
    const idCycleParam = queryParams.get("cycleId");
    const isFinishedParam = queryParams.get("isFinished");


    const prosseguirOuSalvarRascClick = async (salvarOuSeguir:boolean) => {
        if (complete() || salvarOuSeguir) {

            
            const cycleId = idCycleParam? idCycleParam : (await api.get("/api/cycles/current")).data.id;
            const autoAvId = (await api.get(`/api/self-assesment/user/${user?.id}`)).data;

            if (autoAvId) {
                try {
                    const scores = Object.keys(notas).map((key, index) => ({
                        selfAssessmentId: autoAvId,
                        criterionId: index + 1,
                        grade: notas[key],
                        justification: justif[justKeys[index]]
                    }));
                    await api.patch(`/api/self-assesment/${autoAvId}`, {
                        "userId": user?.id,
                        "cycleId": cycleId,
                        "status": !salvarOuSeguir,
                        "scores": scores
                    });
                    console.log(`patch feito:${scores}`)
                } catch (error) {
                    console.error(' Erro no patch. Ocorreu um erro ao fazer a requisição:', error);
                }
            }
            else {
                try {
                    const scores = Object.keys(notas).map((key, index) => ({
                        criterionId: index + 1,
                        grade: notas[key],
                        justification: justif[justKeys[index]]
                    }));

                    await api.post(`/api/self-assesment`, {
                        "userId": user?.id,
                        "cycleId": cycleId,
                        "status": !salvarOuSeguir,
                        "scores": scores
                    });
                } catch (error) {
                    console.error('Erro no post. Ocorreu um erro ao fazer a requisição:', error);
                }
            }
            if (!salvarOuSeguir) {
                if (isFinishedParam === "true"){
                    navigate(`/autoavaliacao/avaliacao-360?cycleId=${cycleId}&isFinished=${isFinishedParam}`);
                }else{
                    navigate("/autoavaliacao/avaliacao-360");
                }
            }

        }
        else {
            console.log("Não está totalmente preenchido")
        }

    };

    const dadosAtt = async () => {
        try {
            const autoAvId = (await api.get(`/api/self-assesment/user/${user?.id}`)).data;
            if (autoAvId) {
                const response = await api.get(`/api/self-assesment/${autoAvId}`);
                const selfAssessment = response.data;
                
                const newNotas: Record<string, number> = {
                    "notaSentimentoDono": 0,
                    "notaResiliencia": 0,
                    "notaOrganizacao": 0,
                    "notaAprender": 0,
                    "notaTeamPlayer": 0,
                    "notaQualidade": 0,
                    "notaPrazo": 0,
                    "notaMaiscomMenos": 0,
                    "notaForadaCaixa": 0
                };
    
                const newJustif: Record<string, string> = {
                    "justSentimentoDono": "",
                    "justResiliencia": "",
                    "justOrganizacao": "",
                    "justAprender": "",
                    "justTeamPlayer": "",
                    "justQualidade": "",
                    "justPrazo": "",
                    "justMaiscomMenos": "",
                    "justForadaCaixa": ""
                };

                selfAssessment.SelfAssessmentScores.forEach((score: SelfAssessmentScore) => {
                    const criterionId = score.criterionId;
                    const criterionName = getCriterionNameById(criterionId); // Função para mapear criterionId para nome
                    newNotas[`nota${criterionName}`] = score.grade;
                    newJustif[`just${criterionName}`] = score.justification;
                });

                setNotas(newNotas);
                setJustif(newJustif);
            }
        } catch (error) {
            console.error('Erro ao buscar autoavaliação:', error);
        }
    };

    const getCriterionNameById = (criterionId: number): string => {
        const criteriaMap: Record<number, string> = {
            1: "SentimentoDono",
            2: "Resiliencia",
            3: "Organizacao",
            4: "Aprender",
            5: "TeamPlayer",
            6: "Qualidade",
            7: "Prazo",
            8: "MaiscomMenos",
            9: "ForadaCaixa"
        };
        return criteriaMap[criterionId] || "Unknown";
    };

    useEffect(() => {
        dadosAtt();
    }, []);



    
    return (
        <div className={`h-full bg-azulBackground w-full ${atencao ? "fixed" : "relative"}`}>
            <SubHeaderAv currentStep={1} setAtencao={setAtencao} atencao={atencao} funcaoSalvar={prosseguirOuSalvarRascClick} />
            <div className="pt-32">
                <div className="flex justify-center">{atencao && (<AtencaoModal setAtencao={setAtencao} atencao={atencao} path={path} />)}</div>
                <div className={atencao ? "opacity-50" : ""}>
                    <Tutorial />
                    <div className="text-roxoPrincipal flex justify-end text-xs mr-4 mt-8">* Campos obrigatórios</div>
                    <div>
                        <div className="bg-[#F9FAFB] shadow mx-4 h-14 font-extrabold text-roxoPrincipal mt-1 pt-4 pl-12 rounded-sm">Critérios Comportamentais</div>
                        <div className="mx-4 bg-branco rounded-sm pl-12 shadow border">
                            <NotasJustif isFinished={isFinishedParam === "true"? true : false} nota={"notaSentimentoDono"} funcaoHandleNota={updateNota} notasObject={notas} justif={"justSentimentoDono"} funcaoJust={updateJust} justifObject={justif} text="Sentimento de dono" textInfo="Demonstrar comprometimento e responsabilidade como se fosse dono do negócio." />
                            <NotasJustif isFinished={isFinishedParam === "true"? true : false} nota={"notaResiliencia"} funcaoHandleNota={updateNota} notasObject={notas} justif={"justResiliencia"} funcaoJust={updateJust} justifObject={justif} text="Resiliência nas Adversidades" textInfo="Manter-se firme e adaptável frente aos desafios e obstáculos do cotidiano profissional." />
                            <NotasJustif isFinished={isFinishedParam === "true"? true : false} nota={"notaOrganizacao"} funcaoHandleNota={updateNota} notasObject={notas} justif={"justOrganizacao"} funcaoJust={updateJust} justifObject={justif} text="Organização no Trabalho" textInfo="Manter o espaço de trabalho organizado para otimizar a produtividade e eficiência." />
                            <NotasJustif isFinished={isFinishedParam === "true"? true : false} nota={"notaAprender"} funcaoHandleNota={updateNota} notasObject={notas} justif={"justAprender"} funcaoJust={updateJust} justifObject={justif} text="Capacidade de Aprender" textInfo="Estar aberto ao aprendizado contínuo e à absorção de novos conhecimentos e habilidades." />
                            <div className="mb-6">
                                <NotasJustif isFinished={isFinishedParam === "true"? true : false} nota={"notaTeamPlayer"} funcaoHandleNota={updateNota} notasObject={notas} justif={"justTeamPlayer"} funcaoJust={updateJust} justifObject={justif} text='Ser "Team Player"' textInfo="Colaborar e apoiar os colegas de equipe para alcançar objetivos comuns." />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="bg-[#F9FAFB] shadow mx-4 h-14 font-extrabold text-roxoPrincipal mt-1 pt-4 pl-12 rounded-sm">Critérios de Execução</div>
                        <div className="mx-4 bg-branco rounded-sm pl-12 shadow border">
                            <NotasJustif isFinished={isFinishedParam === "true"? true : false} nota={"notaQualidade"} funcaoHandleNota={updateNota} notasObject={notas} justif={"justQualidade"} funcaoJust={updateJust} justifObject={justif} text="Entregar com Qualidade" textInfo="Garantir que o trabalho seja realizado com alto padrão de qualidade e excelência." />
                            <NotasJustif isFinished={isFinishedParam === "true"? true : false} nota={"notaPrazo"} funcaoHandleNota={updateNota} notasObject={notas} justif={"justPrazo"} funcaoJust={updateJust} justifObject={justif} text="Atender aos Prazos" textInfo="Cumprir os prazos estabelecidos de forma consistente e confiável." />
                            <NotasJustif isFinished={isFinishedParam === "true"? true : false} nota={"notaMaiscomMenos"} funcaoHandleNota={updateNota} notasObject={notas} justif={"justMaiscomMenos"} funcaoJust={updateJust} justifObject={justif} text="Fazer Mais com Menos" textInfo="Buscar maneiras criativas e eficientes de alcançar resultados com recursos limitados." />
                            <div className="mb-6">
                                <NotasJustif isFinished={isFinishedParam === "true"? true : false} nota={"notaForadaCaixa"} funcaoHandleNota={updateNota} notasObject={notas} justif={"justForadaCaixa"} funcaoJust={updateJust} justifObject={justif} text="Pensar Fora da Caixa" textInfo="Desenvolver soluções inovadoras e fora do convencional para resolver problemas e impulsionar o progresso da empresa." />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mr-4">
                        <button onClick={()=>prosseguirOuSalvarRascClick(false)} className="bg-roxoPrincipal w-48 h-9 rounded-md font-semibold hover:bg-[#6929fe] text-branco mt-12 mb-60">Prosseguir</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutoAvColab;
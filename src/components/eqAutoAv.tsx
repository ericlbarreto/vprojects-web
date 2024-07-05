import { useEffect, useState } from "react";
import NotasJustifEq from "./notasJustEq";
import api from "@/services/axiosConfig";
import { SelfAssessmentScore } from "@/interfaces/SelfAssessmentScore";

interface EqAutoAvProps{
    notasSocio: { [key: string]: number };
    updateNota:Function;
    isFinished:boolean;
    colabId:string;
}

function EqAutoAv({notasSocio, updateNota, isFinished, colabId}:EqAutoAvProps) {

    const [notasColab, setNotasColab] = useState<{ [key: string]: number }>({
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

    const [justifColab, setJustifColab] = useState<{ [key: string]: string }>({
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


    
    const dadosAtt = async () => {
        try {
            const autoAvId = (await api.get(`/api/self-assesment/user/${colabId}`)).data;//idDoColabEscolhido
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
                    const criterionName = getCriterionNameById(criterionId);
                    newNotas[`nota${criterionName}`] = score.grade;
                    newJustif[`just${criterionName}`] = score.justification;
                });

                setNotasColab(newNotas);
                setJustifColab(newJustif);
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
        <div className="mb-20">
            <div className="text-roxoPrincipal flex justify-end text-xs mr-4 mt-8">* Campos obrigatórios</div>
            <div>
                <div className="bg-[#F9FAFB] shadow mx-4 h-14 font-extrabold text-roxoPrincipal mt-1 pt-4 pl-12 rounded-sm">Critérios Comportamentais</div>
                <div className="mx-4 bg-branco rounded-sm pl-12 shadow border">
                    <NotasJustifEq isFinished={isFinished} nota={"notaSentimentoDono"} setNota={updateNota} notasObject={notasSocio} text="Sentimento de dono" textInfo="Demonstrar comprometimento e responsabilidade como se fosse dono do negócio." justifiq={justifColab["justSentimentoDono"]} notaColab={notasColab} />
                    <NotasJustifEq isFinished={isFinished} nota={"notaResiliencia"} setNota={updateNota} notasObject={notasSocio} text="Resiliência nas Adversidades" textInfo="Manter-se firme e adaptável frente aos desafios e obstáculos do cotidiano profissional." justifiq={justifColab["justResiliencia"]} notaColab={notasColab} />
                    <NotasJustifEq isFinished={isFinished} nota={"notaOrganizacao"} setNota={updateNota} notasObject={notasSocio} text="Organização no Trabalho" textInfo="Manter o espaço de trabalho organizado para otimizar a produtividade e eficiência." justifiq={justifColab["justOrganizacao"]} notaColab={notasColab} />
                    <NotasJustifEq isFinished={isFinished} nota={"notaAprender"} setNota={updateNota} notasObject={notasSocio} text="Capacidade de Aprender" textInfo="Estar aberto ao aprendizado contínuo e à absorção de novos conhecimentos e habilidades." justifiq={justifColab["justAprender"]} notaColab={notasColab} />
                    <div className="mb-6">
                        <NotasJustifEq isFinished={isFinished} nota={"notaTeamPlayer"} setNota={updateNota} notasObject={notasSocio} text='Ser "Team Player"' textInfo="Colaborar e apoiar os colegas de equipe para alcançar objetivos comuns." justifiq={justifColab["justTeamPlayer"]} notaColab={notasColab} />
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <div className="bg-[#F9FAFB] shadow mx-4 h-14 font-extrabold text-roxoPrincipal mt-1 pt-4 pl-12 rounded-sm">Critérios de Execução</div>
                <div className="mx-4 bg-branco rounded-sm pl-12 shadow border">
                    <NotasJustifEq isFinished={isFinished} nota={"notaQualidade"} setNota={updateNota} notasObject={notasSocio} text="Entregar com Qualidade" textInfo="Garantir que o trabalho seja realizado com alto padrão de qualidade e excelência." justifiq={justifColab["justQualidade"]} notaColab={notasColab} />
                    <NotasJustifEq isFinished={isFinished} nota={"notaPrazo"} setNota={updateNota} notasObject={notasSocio} text="Atender aos Prazos" textInfo="Cumprir os prazos estabelecidos de forma consistente e confiável." justifiq={justifColab["justPrazo"]} notaColab={notasColab} />
                    <NotasJustifEq isFinished={isFinished} nota={"notaMaiscomMenos"} setNota={updateNota} notasObject={notasSocio} text="Fazer Mais com Menos" textInfo="Buscar maneiras criativas e eficientes de alcançar resultados com recursos limitados." justifiq={justifColab["justMaiscomMenos"]} notaColab={notasColab} />
                    <div className="mb-6">
                        <NotasJustifEq isFinished={isFinished} nota={"notaForadaCaixa"} setNota={updateNota} notasObject={notasSocio} text="Pensar Fora da Caixa" textInfo="Desenvolver soluções inovadoras e fora do convencional para resolver problemas e impulsionar o progresso da empresa." justifiq={justifColab["justForadaCaixa"]} notaColab={notasColab} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EqAutoAv;
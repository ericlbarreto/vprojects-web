import { useState } from "react";
import NotasJustifEq from "./notasJustEq";

function EqAv360(){

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

    const [nota,setNota] = useState(0)

    return (
            <div className="mb-20">
                    <div className="text-roxoPrincipal flex justify-end text-xs mr-4 mt-8">* Campos obrigatórios</div>
                    <div>
                        <div className="bg-[#F9FAFB] shadow mx-4 h-14 font-extrabold text-roxoPrincipal mt-1 pt-4 pl-12 rounded-sm">Critérios Comportamentais</div>
                        <div className="mx-4 bg-branco rounded-sm pl-12 shadow border">
                            <NotasJustifEq nota={nota} setNota={setNota} text="Sentimento de dono" textInfo="Demonstrar comprometimento e responsabilidade como se fosse dono do negócio." justifiq="xxx" />
                            <NotasJustifEq nota={nota} setNota={setNota} text="Resiliência nas Adversidades" textInfo="Manter-se firme e adaptável frente aos desafios e obstáculos do cotidiano profissional." justifiq="xxx"/>
                            <NotasJustifEq nota={nota} setNota={setNota} text="Organização no Trabalho" textInfo="Manter o espaço de trabalho organizado para otimizar a produtividade e eficiência." justifiq="xxx" />
                            <NotasJustifEq nota={nota} setNota={setNota} text="Capacidade de Aprender" textInfo="Estar aberto ao aprendizado contínuo e à absorção de novos conhecimentos e habilidades." justifiq="xxx"/>
                            <div className="mb-6">
                                <NotasJustifEq nota={nota} setNota={setNota} text='Ser "Team Player"' textInfo="Colaborar e apoiar os colegas de equipe para alcançar objetivos comuns." justifiq="xxx" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="bg-[#F9FAFB] shadow mx-4 h-14 font-extrabold text-roxoPrincipal mt-1 pt-4 pl-12 rounded-sm">Critérios de Execução</div>
                        <div className="mx-4 bg-branco rounded-sm pl-12 shadow border">
                            <NotasJustifEq nota={nota} setNota={setNota} text="Entregar com Qualidade" textInfo="Garantir que o trabalho seja realizado com alto padrão de qualidade e excelência." justifiq="xxx" />
                            <NotasJustifEq nota={nota} setNota={setNota} text="Atender aos Prazos" textInfo="Cumprir os prazos estabelecidos de forma consistente e confiável." justifiq="xxx"/>
                            <NotasJustifEq nota={nota} setNota={setNota} text="Fazer Mais com Menos" textInfo="Buscar maneiras criativas e eficientes de alcançar resultados com recursos limitados." justifiq="xxx"/>
                            <div className="mb-6">
                                <NotasJustifEq nota={nota} setNota={setNota} text="Pensar Fora da Caixa" textInfo="Desenvolver soluções inovadoras e fora do convencional para resolver problemas e impulsionar o progresso da empresa." justifiq="xxx"/>
                            </div>
                        </div>
                    </div>
                </div>
    
    )
}

export default EqAv360;
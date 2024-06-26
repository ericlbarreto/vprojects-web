import SubHeaderAv from "@/components/subHeaderAv";
import Tutorial from "@/components/tutorial";
import NotasJustif from "@/components/notasJustif";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AtencaoModal from "@/components/atencao";


function AutoAvColab() {
    const [notaSentimentoDono, setNotaSentimentoDono] = useState(0)
    const [justSentimentoDono, setJustSentimentoDono] = useState("")
    const [notaResiliencia, setNotaResiliencia] = useState(0)
    const [justResiliencia, setJustResiliencia] = useState("")
    const [notaOrganizacao, setNotaOrganizacao] = useState(0)
    const [justOrganizacao, setJustOrganizacao] = useState("")
    const [notaAprender, setNotaAprender] = useState(0)
    const [justAprender, setJustAprender] = useState("")
    const [notaTeamPlayer, setNotaTeamPlayer] = useState(0)
    const [justTeamPlayer, setJustTeamPlayer] = useState("")
    const [notaQualidade, setNotaQualidade] = useState(0)
    const [justQualidade, setJustQualidade] = useState("")
    const [notaPrazo, setNotaPrazo] = useState(0)
    const [justPrazo, setJustPrazo] = useState("")
    const [notaMaiscomMenos, setNotaMaiscomMenos] = useState(0)
    const [justMaiscomMenos, setJustMaiscomMenos] = useState("")
    const [notaForadaCaixa, setNotaForadaCaixa] = useState(0)
    const [justForadaCaixa, setJustForadaCaixa] = useState("")

    const navigate = useNavigate();

    const [atencao, setAtencao] = useState(false);


    const handleButtonClick = () => {
        navigate("/autoavaliacao/avaliacao-360");
    };

    return (
        <div className={`h-full bg-azulBackground w-full ${atencao ? "fixed" : "relative"}`}>
            <SubHeaderAv currentStep={1} setAtencao={setAtencao} atencao={atencao} />
            <div className="pt-32">
                <div className="flex justify-center">{atencao && (<AtencaoModal setAtencao={setAtencao} atencao={atencao} path="/" />)}</div>
                <div className={atencao? "opacity-50":""}>
                    <Tutorial />
                    <div className="text-roxoPrincipal flex justify-end text-xs mr-4 mt-8">* Campos obrigatórios</div>
                    <div>
                        <div className="bg-[#F9FAFB] shadow mx-4 h-14 font-extrabold text-roxoPrincipal mt-1 pt-4 pl-12 rounded-sm">Critérios Comportamentais</div>
                        <div className="mx-4 bg-branco rounded-sm pl-12 shadow border">
                            <NotasJustif nota={notaSentimentoDono} funcaoNota={setNotaSentimentoDono} justif={justSentimentoDono} funcaoJust={setJustSentimentoDono} text="Sentimento de dono" textInfo="Demonstrar comprometimento e responsabilidade como se fosse dono do negócio." />
                            <NotasJustif nota={notaResiliencia} funcaoNota={setNotaResiliencia} justif={justResiliencia} funcaoJust={setJustResiliencia} text="Resiliência nas Adversidades" textInfo="Manter-se firme e adaptável frente aos desafios e obstáculos do cotidiano profissional." />
                            <NotasJustif nota={notaOrganizacao} funcaoNota={setNotaOrganizacao} justif={justOrganizacao} funcaoJust={setJustOrganizacao} text="Organização no Trabalho" textInfo="Manter o espaço de trabalho organizado para otimizar a produtividade e eficiência." />
                            <NotasJustif nota={notaAprender} funcaoNota={setNotaAprender} justif={justAprender} funcaoJust={setJustAprender} text="Capacidade de Aprender" textInfo="Estar aberto ao aprendizado contínuo e à absorção de novos conhecimentos e habilidades." />
                            <div className="mb-6">
                                <NotasJustif nota={notaTeamPlayer} funcaoNota={setNotaTeamPlayer} justif={justTeamPlayer} funcaoJust={setJustTeamPlayer} text='Ser "Team Player"' textInfo="Colaborar e apoiar os colegas de equipe para alcançar objetivos comuns." />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="bg-[#F9FAFB] shadow mx-4 h-14 font-extrabold text-roxoPrincipal mt-1 pt-4 pl-12 rounded-sm">Critérios de Execução</div>
                        <div className="mx-4 bg-branco rounded-sm pl-12 shadow border">
                            <NotasJustif nota={notaQualidade} funcaoNota={setNotaQualidade} justif={justQualidade} funcaoJust={setJustQualidade} text="Entregar com Qualidade" textInfo="Garantir que o trabalho seja realizado com alto padrão de qualidade e excelência." />
                            <NotasJustif nota={notaPrazo} funcaoNota={setNotaPrazo} justif={justPrazo} funcaoJust={setJustPrazo} text="Atender aos Prazos" textInfo="Cumprir os prazos estabelecidos de forma consistente e confiável." />
                            <NotasJustif nota={notaMaiscomMenos} funcaoNota={setNotaMaiscomMenos} justif={justMaiscomMenos} funcaoJust={setJustMaiscomMenos} text="Fazer Mais com Menos" textInfo="Buscar maneiras criativas e eficientes de alcançar resultados com recursos limitados." />
                            <div className="mb-6">
                                <NotasJustif nota={notaForadaCaixa} funcaoNota={setNotaForadaCaixa} justif={justForadaCaixa} funcaoJust={setJustForadaCaixa} text="Pensar Fora da Caixa" textInfo="Desenvolver soluções inovadoras e fora do convencional para resolver problemas e impulsionar o progresso da empresa." />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mr-4">
                        <button onClick={handleButtonClick} className="bg-roxoPrincipal w-48 h-9 rounded-md font-semibold hover:bg-[#6929fe] text-branco mt-12 mb-60">Prosseguir</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutoAvColab;
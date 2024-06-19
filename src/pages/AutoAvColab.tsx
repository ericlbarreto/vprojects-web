import SubHeaderAv from "@/components/subHeaderAv";
import Tutorial from "@/components/tutorial";
import NotasJustif from "@/components/notasJustif";

function AutoAvColab() {
    return (
        <div className="h-full bg-azulBackground ">
            <SubHeaderAv />
            <div className="pt-32">
                <Tutorial />
                <div className="text-roxoPrincipal flex justify-end text-xs mr-4 mt-8">* Campos obrigatórios</div>
                <div>
                    <div className="bg-[#F9FAFB] shadow mx-4 h-14 font-extrabold text-roxoPrincipal mt-1 pt-4 pl-12 rounded-sm">Critérios Comportamentais</div>
                    <div className="mx-4 bg-branco rounded-sm pl-12 shadow border">
                        <NotasJustif text="Sentimento de dono" textInfo="Demonstrar comprometimento e responsabilidade como se fosse dono do negócio." />
                        <NotasJustif text="Resiliência nas Adversidades" textInfo="Manter-se firme e adaptável frente aos desafios e obstáculos do cotidiano profissional." />
                        <NotasJustif text="Organização no Trabalho" textInfo="Manter o espaço de trabalho organizado para otimizar a produtividade e eficiência." />
                        <NotasJustif text="Capacidade de Aprender" textInfo="Estar aberto ao aprendizado contínuo e à absorção de novos conhecimentos e habilidades." />
                        <div className="mb-6">
                            <NotasJustif text='Ser "Team Player"' textInfo="Colaborar e apoiar os colegas de equipe para alcançar objetivos comuns." />
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="bg-[#F9FAFB] shadow mx-4 h-14 font-extrabold text-roxoPrincipal mt-1 pt-4 pl-12 rounded-sm">Critérios de Execução</div>
                    <div className="mx-4 bg-branco rounded-sm pl-12 shadow border">
                        <NotasJustif text="Entregar com Qualidade" textInfo="Garantir que o trabalho seja realizado com alto padrão de qualidade e excelência." />
                        <NotasJustif text="Atender aos Prazos" textInfo="Cumprir os prazos estabelecidos de forma consistente e confiável." />
                        <NotasJustif text="Fazer Mais com Menos" textInfo="Buscar maneiras criativas e eficientes de alcançar resultados com recursos limitados."/>
                        <div className="mb-6">
                            <NotasJustif text="Pensar Fora da Caixa" textInfo="Desenvolver soluções inovadoras e fora do convencional para resolver problemas e impulsionar o progresso da empresa."/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mr-4">
                    <button className="bg-roxoPrincipal w-48 h-9 rounded-md font-semibold hover:bg-[#6929fe] text-branco mt-12 mb-60">Prosseguir </button>
                </div>
            </div>
        </div>
    );
}

export default AutoAvColab;
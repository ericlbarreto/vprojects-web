import LinhaBaixo from "../assets/linhaTutBaixo.svg";
import LinhaCima from "../assets/linhaTutCima.svg";
import BolinhaNum from "./ui/bolinhanum";

function TutorialPartner() {

    return(
        <div className=" flex flex-col justify-center items-center ">
            <div className="flex gap-3 mx-12">
                <div className="p-0"><BolinhaNum num={"1"} /></div>
                <div><img className="pb-7" src={LinhaCima} alt="Linha curvada para cima" /></div>
                <div><BolinhaNum num={"2"} /></div>
                <div><img className="pt-7" src={LinhaBaixo} alt="Linha curvada para baixo" /></div>
                <div><BolinhaNum num={"3"} /></div>
            </div>
            <div className="flex justify-between">
                <div className="gap-y-2">
                    <p className="font-semibold">Selecione o colaborador</p>
                    <p className="text-[#4b4b4b] text-xs"> Para iniciar a fase de equalização das suas notas</p>
                </div>
                <div className="gap-y-2">
                    <p className="font-semibold">Pesquisa</p>
                    <p className="text-[#4b4b4b] text-xs"> Você pode realizar a pesquisa utilizando recursos de filtragem</p>
                </div>
                <div className="gap-y-2 ">
                    <p className="font-semibold">Inicie a equalização</p>
                    <p className="text-[#4b4b4b] text-xs">Para iniciar a equalização basta clicar no colaborador de sua escolha</p>
                </div>
            </div>
        </div>
    );

};

export default TutorialPartner;
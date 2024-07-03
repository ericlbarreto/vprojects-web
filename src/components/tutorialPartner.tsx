import LinhaBaixo from "../assets/linhaTutBaixo.svg";
import LinhaCima from "../assets/linhaTutCima.svg";
import BolinhaNum from "./ui/bolinhanum";

function TutorialPartner() {
    return (
        <div className="grid grid-cols-9 px-80 pt-2">

            <div className="col-span-1 col-start-2 ml-10 mt-4 mb-2">
                <BolinhaNum num={"1"} />
            </div>

            <div className="col-span-2 mb-6">
                <img src={LinhaCima} alt="Linha curvada para cima" />
            </div>

            <div className="col-span-1 ml-5 mt-4  mb-2">
                <BolinhaNum num={"2"} />
            </div>

            <div className="col-span-2 mt-10">
                <img src={LinhaBaixo} alt="Linha curvada para baixo" />
            </div>

            <div className="col-span-1 ml-5 mt-4  mb-2">
                <BolinhaNum num={"3"} />
            </div>

            <div className="col-span-3 col-start text-center ml-10 flex flex-col gap-2">
                <p className="font-semibold">Selecione o colaborador</p>
                <p className="text-[#4b4b4b] text-xs ">
                    Para iniciar a fase de equalização das suas notas
                </p>
            </div>

            <div className="col-span-3 text-center flex flex-col gap-2">
                <p className="font-semibold">Pesquisa</p>
                <p className="text-[#4b4b4b] text-xs px-10">
                    Você pode realizar a pesquisa utilizando recursos de filtragem
                </p>
            </div>

            <div className="col-span-3 text-center flex flex-col gap-2">
                <p className="font-semibold">Inicie a equalização</p>
                <p className="text-[#4b4b4b] text-xs px-9">
                Para iniciar a equalização basta clicar no colaborador de sua escolha
                </p>
            </div>

        </div>
    );
}

export default TutorialPartner;

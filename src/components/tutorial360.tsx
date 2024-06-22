import { useState } from "react";
import ClosedEye from "../assets/closedEye.svg";
import OpenEye from "../assets/openEye.svg";
import BolinhaNum from "./ui/bolinhanum";
import LinhaBaixo from "../assets/linhaTutBaixo.svg";
import LinhaCima from "../assets/linhaTutCima.svg";

function Tutorial() {
    const [closed, setClosed] = useState(1);

    return (
        <div className="m-4 shadow rounded">
            <div className="bg-[#F9FAFB] flex justify-between items-center p-6 rounded">
                <p className={`text-xl font-semibold ${closed ? "text-[#DBDBDB]" : "text-roxoPrincipal"}`}>
                    Tutorial de preenchimento
                </p>
                <button onClick={() => setClosed(closed ? 0 : 1)} className="h-6 w-10">
                    <img className="h-6 w-12" src={closed ? ClosedEye : OpenEye} alt="Não mostrar tutorial" />
                </button>
            </div>
            <div className={`transition-all duration-500 transform ${closed ? "scale-y-0 h-0" : "scale-y-100 h-auto"} origin-top overflow-hidden`}>
                <div className="grid grid-cols-12 p-6 justify-items-center rounded bg-white">
                    <div className="col-span-1 col-start-2 mt-10">
                        <BolinhaNum num={"1"} />
                    </div>

                    <div className="col-span-2">
                        <img src={LinhaCima} alt="Linha curvada para cima" />
                    </div>

                    <div className="col-span-1 mt-10">
                        <BolinhaNum num={"2"} />
                    </div>

                    <div className="col-span-2 mt-24">
                        <img src={LinhaBaixo} alt="Linha curvada para cima" />
                    </div>

                    <div className="col-span-1 mt-10">
                        <BolinhaNum num={"3"} />
                    </div>

                    <div className="col-span-2">
                        <img src={LinhaCima} alt="Linha curvada para cima" />
                    </div>

                    <div className="col-span-1 mt-10">
                        <BolinhaNum num={"4"} />
                    </div>

                    <div className="col-span-3 text-center">
                        <p className="font-semibold">Pesquise o colaborador</p>
                        <p className="text-[#4b4b4b]">
                            Para iniciar a sua avaliação 360, pesquise o colaborador de sua escolha.
                        </p>
                    </div>

                    <div className="col-span-3 text-center">
                        <p className="font-semibold">Selecione</p>
                        <p className="text-[#4b4b4b]">
                            O colaborador que deseja realizar a avaliação.
                        </p>
                    </div>

                    <div className="col-span-3 text-center">
                        <p className="font-semibold">Preencha os campos</p>
                        <p className="text-[#4b4b4b]">
                            Fornecendo feedback construtivo e promovendo o desenvolvimento contínuo do colaborador.
                        </p>
                    </div>

                    <div className="col-span-3 text-center">
                        <p className="font-semibold">Botão finalizar</p>
                        <p className="text-[#4b4b4b]">
                            Se desejar concluir e enviar o ciclo de avaliação, clique no botão "Finalizar".
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tutorial;

import { useState } from "react";
import ClosedEye from "../assets/closedEye.svg";
import OpenEye from "../assets/openEye.svg";
import LinhaBaixo from "../assets/linhaTutBaixo.svg";
import LinhaCima from "../assets/linhaTutCima.svg";
import BolinhaNum from "./ui/bolinhanum";

function TutorialEqAv() {
    const [closed, setClosed] = useState(1);

    return (

        <div className="bg-[#F9FAFB] m-4 shadow ">
            <div className="flex justify-between">
                <div className={`p-2 flex items-center ml-4 font-semibold ${closed ? "text-[#DBDBDB]" : "text-roxoPrincipal"}`}><p>Tutorial de preenchimento</p></div>
                <button
                    onClick={() => setClosed(closed ? 0 : 1)} className="p-2 h-12 w-10 mr-4"> <img className="h-6 w-12" src={closed ? ClosedEye : OpenEye} alt="Não mostrar tutorial" />
                </button>
            </div>
            <div className={`transition-all duration-500 transform ${closed ? "scale-y-0 h-0" : "scale-y-100 h-auto"} origin-top overflow-hidden`}>
                <div className="grid grid-cols-12 p-6 justify-items-center rounded bg-white">
                    <div className="col-span-1 col-start-2">
                        <BolinhaNum num={"1"} />
                    </div>

                    <div className="col-span-2">
                        <img src={LinhaCima} alt="Linha curvada para cima" />
                    </div>

                    <div className="col-span-1">
                        <BolinhaNum num={"2"} />
                    </div>

                    <div className="col-span-2 mt-10">
                        <img src={LinhaBaixo} alt="Linha curvada para cima" />
                    </div>

                    <div className="col-span-1">
                        <BolinhaNum num={"3"} />
                    </div>

                    <div className="col-span-2">
                        <img src={LinhaCima} alt="Linha curvada para cima" />
                    </div>

                    <div className="col-span-1">
                        <BolinhaNum num={"4"} />
                    </div>

                    <div className="col-span-3 text-center mt-2">
                        <p className="font-semibold text-sm">Ler os critérios de avaliação</p>
                        <p className="text-[#4b4b4b] text-xs">
                            Passando o mouse por cima do botão de informação ao lado de cada critério.
                        </p>
                    </div>

                    <div className="col-span-3 text-center mt-2">
                        <p className="font-semibold text-sm">Atribuir uma nota</p>
                        <p className="text-[#4b4b4b] text-xs">
                            De acordo com sua percepção e experiência, utilizando a escala de avaliação fornecida.
                        </p>
                    </div>

                    <div className="col-span-3 text-center mt-2">
                        <p className="font-semibold text-sm">Botão salvar</p>
                        <p className="text-[#4b4b4b] text-xs">
                        Caso não tenha finalizado o preenchimento, clique no botão “Salvar Rascunho” para não perder suas respostas.
                        </p>
                    </div>

                    <div className="col-span-3 text-center mt-2">
                        <p className="font-semibold text-sm">Botão concluir equalização</p>
                        <p className="text-[#4b4b4b] text-xs">
                            Se desejar concluir e enviar a equalização, clique no botão "Concluir equalização".
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default TutorialEqAv;
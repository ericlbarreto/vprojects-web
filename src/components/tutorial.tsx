import { useState } from "react";
import ClosedEye from "../assets/closedEye.svg";
import OpenEye from "../assets/openEye.svg";
import LinhaBaixo from "../assets/linhaTutBaixo.svg";
import LinhaCima from "../assets/linhaTutCima.svg";
import BolinhaNum from "./ui/bolinhanum";
import NotaQuadrada from "./notaQuadrada";


function Tutorial() {

    const [closed, setClosed] = useState(1);

    return (

        <div className="bg-[#F9FAFB] m-4 shadow ">
            <div className="flex justify-between">
                    <p className={`p-2 ml-4 text-sm font-semibold ${closed? "text-[#DBDBDB]" : "text-roxoPrincipal"}`}>Tutorial de preenchimento</p>
                    <button 
                        onClick={() => setClosed(closed? 0 : 1)} className="p-2 h-6 w-10 mr-4"> <img className="h-6 w-12" src={closed? ClosedEye : OpenEye} alt="Não mostrar tutorial"/>
                    </button>
            </div>
            {closed? "":
            <div className="m-8">
                <div className="flex ml-12">
                    <BolinhaNum num={"1"}/>
                    <img className="w-44 pb-7" src={LinhaCima} alt="Linha curvada para cima"/>
                    <BolinhaNum num={"2"}/>
                    <img className="w-44 pt-7" src={LinhaBaixo} alt="Linha curvada para cima"/>
                    <BolinhaNum num={"3"}/>
                    <img className="w-44 pb-7" src={LinhaCima} alt="Linha curvada para cima"/>
                    <BolinhaNum num={"4"}/>
                    <img className="w-44 pt-7" src={LinhaBaixo} alt="Linha curvada para cima"/>
                    <BolinhaNum num={"5"}/>
                </div>
                <div className="flex justify-between">
                    <div>
                    <p className="text-black font-bold text-sm">Ler os critérios de avaliação</p>
                    <p className="text-[#4B4B4B] text-xs w-44 text-center mt-1"> Passando o mouse por cima do botão de informação ao lado de cada critério.</p>
                    <p className="text-roxoPrincipal text-sm mt-8">Escala de avaliação</p>
                    <div className=" mt-2 ml-10"><NotaQuadrada isStatic={1}/></div>
                    <p className="text-xs mt-4 ml-10 mb-8">Insatisfatório</p>
                    </div>
                    <div>
                    <p className="text-black font-bold text-sm">Atribuir uma nota</p>
                    <p className="text-[#4B4B4B] text-xs w-44 mt-1"> De acordo com sua percepção e experiência, utilizando a escala de avaliação fornecida.</p>
                    <div className="mt-11 ml-5"><NotaQuadrada isStatic={2}/></div>
                    <p className="text-xs mt-4 ml-10 ">Regular</p>
                    </div>
                    <div>
                    <p className="text-black font-bold text-sm mr-10">Justificar as avaliações</p>
                    <p className="text-[#4B4B4B] text-xs w-44 mt-1 ml-1">  Explicando o motivo pelo qual atribuiu determinada nota em cada um dos critérios.</p>
                    <div className="mt-11 ml-8"><NotaQuadrada isStatic={3}/></div>
                    <p className="text-xs mt-4 ml-9">Satisfatório</p>
                    </div>
                    <div>
                    <p className="text-black font-bold text-sm ml-2">Botão salvar</p>
                    <p className="text-[#4B4B4B] text-xs w-44 mt-1 mr-2"> Caso não tenha finalizado o preenchimento, clique no botão “Salvar Rascunho” para não perder suas respostas.</p>
                    <div className="mt-7"><NotaQuadrada isStatic={4}/></div>
                    <p className="text-xs mt-4 ml-6">Bom</p>
                    </div>
                    <div>
                    <p className="text-black font-bold text-sm">Botão prosseguir</p>
                    <p className="text-[#4B4B4B] text-xs w-44 mt-1">Se desejar concluir e enviar a autoavaliação, clique no botão "Prosseguir".</p>
                    <div className="mt-14 ml-8"><NotaQuadrada isStatic={5}/></div>
                    <p className="text-xs mt-4 ml-12 ">Excelente</p>
                    </div>
                </div>
            </div>}
            
                    
        </div>
    )
}

export default Tutorial;
import { useState } from "react";
import ClosedEye from "../assets/closedEye.svg";
import OpenEye from "../assets/openEye.svg";
import LinhaBaixo from "../assets/linhaTutBaixo.svg";
import LinhaCima from "../assets/linhaTutCima.svg"


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
            <div className="flex m-8 mx-24">
                <div>
                    <div className="flex">
                    <div className="text-roxoPrincipal font-bold rounded-full shadow m-4 w-8 h-8 text-center pt-1">1</div>
                    <img className="w-44 pb-7" src={LinhaCima} alt="Linha curvada para cima"/>
                    </div>
                    <p className="text-black font-bold text-sm">Ler os critérios de avaliação</p>
                </div>
                
                <div>
                    <div className="text-roxoPrincipal font-bold rounded-full shadow m-4 w-8 h-8 text-center pt-1">2</div>
                </div>
                <img className="w-44 pt-7" src={LinhaBaixo} alt="Linha curvada para cima"/>
                <div>
                    <div className="text-roxoPrincipal font-bold rounded-full shadow m-4 w-8 h-8 text-center pt-1">3</div>
                </div>
                <img className="w-44 pb-7" src={LinhaCima} alt="Linha curvada para cima"/>
                <div>
                    <div className="text-roxoPrincipal font-bold rounded-full shadow m-4 w-8 h-8 text-center pt-1">4</div>
                </div>
                <img className="w-44 pt-7" src={LinhaBaixo} alt="Linha curvada para cima"/>
                <div>
                    <div className="text-roxoPrincipal font-bold rounded-full shadow m-4 w-8 h-8 text-center pt-1">5</div>
                </div>
            </div>}
            
                    
        </div>
    )
}

export default Tutorial;
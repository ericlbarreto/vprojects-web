
import NotaQuadrada from "./notaQuadrada";
import Info from "../assets/info.svg"
import { useState } from "react";
import { NotaJustifEq } from "@/interfaces/NotaJustifEq";
import NotaEq from "./notaEq";

function NotasJustifEq({ text, textInfo, nota, setNota, justifiq}: NotaJustifEq) {
    const [condicionalInfo, setCondicionalInfo] = useState(false)
    return (
        <div className="mt-10">
            <div className="flex ml-1">
                {text}
                <div onMouseEnter={() => setCondicionalInfo(true)} onMouseLeave={() => setCondicionalInfo(false)}>
                    <img className="size-4 ml-3 mt-1" src={Info} alt="Info" />
                </div>
            </div>
            {condicionalInfo ?
                <div className="absolute w-80 bg-[#F6FAFF] border rounded-sm shadow text-roxoPrincipal text-center font-medium text-sm ml-20">
                    {textInfo}
                </div> : ""}
            <div className="flex shadow rounded-sm w-80 bg-[#E9E9E9] h-10 pl-3 border text-sm">
                <div className="pt-3 flex">
                    <div className="w-40">Nota do colaborador:</div>
                    <div className="pt-0.5 pl-3"><NotaEq isNotaColab={true} nota={nota} setNota={setNota}/></div>
                </div>
                <div className="text-roxoPrincipal pl-10 pt-1">*</div>
            </div>
            <div className="shadow rounded-sm border h-40 mt-3 mr-12 text-sm">
                    <p className="w-full bg-[#E9E9E9] h-40 resize-none p-4 text-[#717171]">{justifiq}</p>
            </div>
            <div className="flex shadow rounded-sm w-80 h-10 pl-3 mt-3 border text-sm">
                <div className="pt-3 flex">
                    <div>Nota do gestor:</div>
                    <div className="pt-0.5 pl-3"><NotaEq isNotaColab={false} nota={nota} setNota={setNota}/></div>
                </div>
                <div className="text-roxoPrincipal pl-24 pt-1">*</div>
            </div>
        </div>
    )
}

export default NotasJustifEq;
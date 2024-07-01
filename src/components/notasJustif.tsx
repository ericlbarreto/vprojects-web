
import NotaQuadrada from "./notaQuadrada";
import Info from "../assets/info.svg"
import { useState } from "react";
import { NotaJustifProps } from "@/interfaces/NotaJustifProps";

function NotasJustif({ text, textInfo,justif, funcaoJust, nota, funcaoHandleNota, notasObject, justifObject}: NotaJustifProps) {
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
            <div className="flex shadow rounded-sm w-80 h-10 pl-3 border text-sm">
                <div className="pt-3 flex">
                    <div>Nota:</div>
                    <div className="pt-0.5 pl-3"><NotaQuadrada nota = {nota} funcaoHandleNota={funcaoHandleNota} notasObject={notasObject} isStatic={0}  /></div>
                </div>
                <div className="text-roxoPrincipal pl-40 pt-1">*</div>
            </div>
            <div className="shadow rounded-sm border h-40 mt-3 mr-12 text-sm">
                <form>
                    <textarea onChange={(e) => funcaoJust(justif, e.target.value)} className="w-full h-40 resize-none" name="" id="" value={justifObject[justif]} maxLength={1000} placeholder="Insira sua justificativa"></textarea>
                </form>
            </div>
        </div>
    )
}

export default NotasJustif;
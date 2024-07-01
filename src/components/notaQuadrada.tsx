import { NotaQuadradaProps } from "@/interfaces/NotaQuadradaProps";

function NotaQuadrada({isStatic, nota, funcaoHandleNota,notasObject}: NotaQuadradaProps) {
  return (
    <div className="flex">
        <button onClick={()=>funcaoHandleNota(nota, 1)} className={` ${isStatic >0?"border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal": (notasObject[nota]>0)? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}>1</button>
        <button onClick={()=>funcaoHandleNota(nota, 2)} className={` ${isStatic >1?"border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal": (notasObject[nota]>1 && isStatic===0)? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}>2</button>
        <button onClick={()=>funcaoHandleNota(nota, 3)} className={` ${isStatic >2?"border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal": (notasObject[nota]>2 && isStatic===0)? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}>3</button>
        <button onClick={()=>funcaoHandleNota(nota, 4)} className={` ${isStatic >3?"border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal": (notasObject[nota]>3 && isStatic===0)? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}>4</button>
        <button onClick={()=>funcaoHandleNota(nota, 5)} className={` ${isStatic >4?"border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal": (notasObject[nota]>4 && isStatic===0)? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}>5</button>
    </div>
  )
}

export default NotaQuadrada;

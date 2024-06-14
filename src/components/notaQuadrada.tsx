import { useState } from "react";


interface NotaQuadradaProps{
    isStatic: number;
}

function NotaQuadrada({isStatic}: NotaQuadradaProps) {
    const [selected, setSelected] = useState(0);
  return (
    <div className="flex">
        <button onClick={()=>setSelected(1)} className={` ${isStatic >0?"border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal": (selected>0)? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}>1</button>
        <button onClick={()=>setSelected(2)} className={` ${isStatic >1?"border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal": (selected>1 && isStatic===0)? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}>2</button>
        <button onClick={()=>setSelected(3)} className={` ${isStatic >2?"border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal": (selected>2 && isStatic===0)? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}>3</button>
        <button onClick={()=>setSelected(4)} className={` ${isStatic >3?"border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal": (selected>3 && isStatic===0)? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}>4</button>
        <button onClick={()=>setSelected(5)} className={` ${isStatic >4?"border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal": (selected>4 && isStatic===0)? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}>5</button>
    </div>
  )
}

export default NotaQuadrada;

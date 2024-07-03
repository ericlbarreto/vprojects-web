import { NotaQuadradaProps } from "@/interfaces/NotaQuadradaProps";

function NotaQuadrada({ isStatic, nota, funcaoHandleNota, notasObject }: NotaQuadradaProps) {
  return (
    <div>
      {isStatic === 0 ?
        <div className="flex">
          <button onClick={() => funcaoHandleNota(nota, 1)} className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]===1?"border-[#CD0000] text-[#CD0000] bg-[#FFE4E4]": notasObject[nota]===2?"border-[#FC945B] text-[#FC945B] bg-[#FFEADE]": notasObject[nota]===3?"border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]":notasObject[nota]===4?"border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": notasObject[nota]===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>1</button>
          <button onClick={() => funcaoHandleNota(nota, 2)} className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]===2?"border-[#FC945B] text-[#FC945B] bg-[#FFEADE]": notasObject[nota]===3?"border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]":notasObject[nota]===4?"border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": notasObject[nota]===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>2</button>
          <button onClick={() => funcaoHandleNota(nota, 3)} className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]===3?"border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]":notasObject[nota]===4?"border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": notasObject[nota]===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>3</button>
          <button onClick={() => funcaoHandleNota(nota, 4)} className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]===4?"border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": notasObject[nota]===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>4</button>
          <button onClick={() => funcaoHandleNota(nota, 5)} className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>5</button>
        </div> :
        <div className="flex">
          <button className={`border rounded w-4 text-center h-4 text-xs ${isStatic===1? "border-[#CD0000] text-[#CD0000] bg-[#FFE4E4]": isStatic===2?"border-[#FC945B] text-[#FC945B] bg-[#FFEADE]": isStatic===3?"border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]":isStatic===4?"border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": isStatic===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>1</button>
          <button className={`border rounded w-4 text-center h-4 text-xs ${isStatic===2?"border-[#FC945B] text-[#FC945B] bg-[#FFEADE]": isStatic===3?"border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]":isStatic===4?"border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": isStatic===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>2</button>
          <button className={`border rounded w-4 text-center h-4 text-xs ${isStatic===3?"border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]":isStatic===4?"border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": isStatic===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>3</button>
          <button className={`border rounded w-4 text-center h-4 text-xs ${isStatic===4?"border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": isStatic===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>4</button>
          <button className={`border rounded w-4 text-center h-4 text-xs ${isStatic===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>5</button>
        </div>}

    </div>
  )
}

export default NotaQuadrada;

interface NotaEqProps {
    isNotaColab: boolean;
    nota: string;
    setNota: Function;
    notasObject: { [key: string]: number }
}


function NotaEq({ isNotaColab, nota, setNota, notasObject }: NotaEqProps) {
    return (

        <div>{isNotaColab ?
            <div className="flex">
                <button className={`border  rounded w-4 text-center h-4 text-xs ${notasObject[nota]>=1?"border-[#959595] text-[#959595]":"bg-[#DBDBDB] border-[#CCCCCC] text-[#CCCCCC]"}`}>1</button>
                <button className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]>=2?"border-[#959595] text-[#959595]":"bg-[#DBDBDB] border-[#CCCCCC] text-[#CCCCCC]"}`}>2</button>
                <button className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]>=3?"border-[#959595] text-[#959595]":"bg-[#DBDBDB] border-[#CCCCCC] text-[#CCCCCC]"}`}>3</button>
                <button className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]>=4?"border-[#959595] text-[#959595]":"bg-[#DBDBDB] border-[#CCCCCC] text-[#CCCCCC]"}`}>4</button>
                <button className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]>=5?"border-[#959595] text-[#959595]":"bg-[#DBDBDB] border-[#CCCCCC] text-[#CCCCCC]"}`}>5</button>
            </div> : 
            <div> 
                <div className="flex"> 
                    <button onClick={() => setNota(nota, 1)} className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]===1? "border-[#CD0000] text-[#CD0000] bg-[#FFE4E4]": notasObject[nota]===2?"border-[#FC945B] text-[#FC945B] bg-[#FFEADE]": notasObject[nota]===3?"border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]": notasObject[nota]===4?"border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": notasObject[nota]===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>1</button>
                    <button onClick={() => setNota(nota, 2)} className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]===2? "border-[#FC945B] text-[#FC945B] bg-[#FFEADE]": notasObject[nota]===3?"border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]": notasObject[nota]===4?"border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": notasObject[nota]===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>2</button>
                    <button onClick={() => setNota(nota, 3)} className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]===3? "border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]": notasObject[nota]===4?"border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": notasObject[nota]===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>3</button>
                    <button onClick={() => setNota(nota, 4)} className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]===4? "border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]": notasObject[nota]===5?"border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>4</button>
                    <button onClick={() => setNota(nota, 5)} className={`border rounded w-4 text-center h-4 text-xs ${notasObject[nota]===5? "border-[#11D400] text-[#11D400] bg-[#DFFFDD]":"text-[#9F9F9F] border-[#C6C6C6]"}`}>5</button>
                </div>
            </div>}

        </div>
    )
}

export default NotaEq;

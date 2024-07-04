import { GradeProps } from "@/interfaces/Grade";

function Grade({ grade, editFunction, edit }: GradeProps) {
    return (
        <div className="flex">
            <button onClick={() => edit && editFunction(1)} className={`border rounded w-4 text-center h-4 text-xs ${grade === 1 ? "border-[#CD0000] text-[#CD0000] bg-[#FFE4E4]" : grade === 2 ? "border-[#FC945B] text-[#FC945B] bg-[#FFEADE]" : grade === 3 ? "border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]" : grade === 4 ? "border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]" : grade === 5 ? "border-[#11D400] text-[#11D400] bg-[#DFFFDD]" : "text-[#9F9F9F] border-[#C6C6C6]"}`}>1</button>
            <button onClick={() => edit && editFunction(2)} className={`border rounded w-4 text-center h-4 text-xs ${grade === 2 ? "border-[#FC945B] text-[#FC945B] bg-[#FFEADE]" : grade === 3 ? "border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]" : grade === 4 ? "border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]" : grade === 5 ? "border-[#11D400] text-[#11D400] bg-[#DFFFDD]" : "text-[#9F9F9F] border-[#C6C6C6]"}`}>2</button>
            <button onClick={() => edit && editFunction(3)} className={`border rounded w-4 text-center h-4 text-xs ${grade === 3 ? "border-[#DFBC04] text-[#DFBC04] bg-[#FEFFC5]" : grade === 4 ? "border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]" : grade === 5 ? "border-[#11D400] text-[#11D400] bg-[#DFFFDD]" : "text-[#9F9F9F] border-[#C6C6C6]"}`}>3</button>
            <button onClick={() => edit && editFunction(4)} className={`border rounded w-4 text-center h-4 text-xs ${grade === 4 ? "border-[#8FE225] text-[#8FE225] bg-[#F1FFD3]" : grade === 5 ? "border-[#11D400] text-[#11D400] bg-[#DFFFDD]" : "text-[#9F9F9F] border-[#C6C6C6]"}`}>4</button>
            <button onClick={() => edit && editFunction(5)} className={`border rounded w-4 text-center h-4 text-xs ${grade === 5 ? "border-[#11D400] text-[#11D400] bg-[#DFFFDD]" : "text-[#9F9F9F] border-[#C6C6C6]"}`}>5</button>
        </div>
    )
}


export default Grade;

import { GradeProps } from "@/interfaces/Grade";

function Grade({ isStatic, nota, funcaoNota, edit }: GradeProps & { edit: boolean }) {
  return (
      <div className="flex">
          <button 
              onClick={() => edit && funcaoNota(1)} 
              className={` ${isStatic > 0 ? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : (nota > 0) ? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}
          >1</button>
          <button 
              onClick={() => edit && funcaoNota(2)} 
              className={` ${isStatic > 1 ? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : (nota > 1 && isStatic === 0) ? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}
          >2</button>
          <button 
              onClick={() => edit && funcaoNota(3)} 
              className={` ${isStatic > 2 ? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : (nota > 2 && isStatic === 0) ? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}
          >3</button>
          <button 
              onClick={() => edit && funcaoNota(4)} 
              className={` ${isStatic > 3 ? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : (nota > 3 && isStatic === 0) ? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}
          >4</button>
          <button 
              onClick={() => edit && funcaoNota(5)} 
              className={` ${isStatic > 4 ? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : (nota > 4 && isStatic === 0) ? "border-roxoPrincipal bg-[#E7F1FF] text-roxoPrincipal" : "border-[#C6C6C6] text-[#9F9F9F]"} border rounded w-4 text-center h-4 text-xs`}
          >5</button>
      </div>
  );
}


export default Grade;

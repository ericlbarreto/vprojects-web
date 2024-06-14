import SubHeaderAv from "@/components/subHeaderAv";
import Tutorial from "@/components/tutorial";
  

function AutoAvColab() {
    return (
        <div className="h-screen">
            <SubHeaderAv/>
            <div className="pt-32">
                <Tutorial/>
                <div className="text-roxoPrincipal flex justify-end text-xs mr-4 mt-8">* Campos obrigatórios</div>
                <div className="bg-[#F9FAFB] shadow m-4 h-14 font-extrabold text-roxoPrincipal mt-1 pt-4 pl-12 rounded-sm">Critérios Comportamentais</div>
                <div className="m-4 bg-branco h-48">
                    Sentimento de dono
                </div>
            </div>
        </div>
    );
}

export default AutoAvColab;
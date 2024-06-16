import SubHeaderAv from "@/components/subHeaderAv";
import Tutorial360 from "@/components/tutorial360";
import { FaPlus } from "react-icons/fa6";


function Avaliacao360() {
    return (
        <div className="h-screen">
            <SubHeaderAv />
            <div className="pt-32">
                <Tutorial360 />
                <div className="m-4">
                    <p className="font-medium text-lg">Adicione aqui os colaboradores</p>

                    <button className="flex items-center justify-center text-white font-semibold mt-4 bg-roxoPrincipal hover:bg-blue-600 rounded-lg w-72 h-12">
                        <FaPlus /> <span className="ml-2">Adicionar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Avaliacao360;
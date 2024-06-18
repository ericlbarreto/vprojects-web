import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { SelectCollabProps } from "@/interfaces/SelectCollabs";
import { FaPlus } from "react-icons/fa6";

const SelectColab = ({ collaborators }: SelectCollabProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="flex items-center justify-center text-white font-semibold mt-4 bg-roxoPrincipal hover:bg-blue-600 rounded-lg w-72 h-12">
                    <FaPlus /> <span className="ml-2">Adicionar</span>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 m-4">
                <div>
                    <p className="font-medium text-lg">Lista de Colaboradores</p>
                    <ul>
                        {collaborators.map((collaborator) => (
                            <li key={collaborator.id}>{collaborator.name}</li>
                        ))}
                    </ul>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default SelectColab;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiPencil } from "react-icons/hi2";
import DropDown from "../assets/dropdown.svg";
import { Card360Props } from "@/interfaces/Card360Props";

const CollaboratorItem = ({ collaborator, onRemove, onExpandToggle, isExpanded }: Card360Props) => {

    return (
        <div className="mb-8 p-4 border rounded-lg bg-white">
            <div className="flex justify-between items-center relative">
                <div className="grid grid-cols-12 w-full">
                    <div className="flex items-center col-span-1 justify-center">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="col-span-1 col-start-2">
                        <p className="font-medium text-[#455468]">{collaborator.name}</p>
                        <p className="font-regular text-[#5e718d]">{collaborator.position}</p>
                    </div>


                    <div className="col-span-2 col-start-3 flex items-center justify-center">
                        <div className="flex items-center justify-center bg-[#feffc2] w-40 h-6 rounded-sm text-xs text-[#9b7900] font-medium">
                            <p>Não finalizado</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 col-span-1 col-start-11">
                        <HiPencil className="text-[#5702ff]" />
                        <button className="text-[#5702ff]">
                            Editar
                        </button>
                    </div>

                    <div className="flex items-center col-span-1 col-start-12">
                        <button onClick={() => onRemove(collaborator)} className="text-[#f96464]">
                            Excluir
                        </button>
                    </div>
                </div>

                <button onClick={() => onExpandToggle(collaborator.id)} className="flex justify-center items-center bg-white shadow-xl w-10 h-10 overflow-visible rounded-full absolute right-1/2 top-11">
                    <img className="h-4 w-4" src={DropDown} alt="Ícone indicando expansão para baixo" />
                </button>
            </div>

            {isExpanded && (
                <div className="mt-2">
                    <p><strong>Email:</strong> {collaborator.email}</p>
                </div>
            )}
        </div>
    );
}

export default CollaboratorItem;

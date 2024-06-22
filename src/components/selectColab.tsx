import { ChangeEvent, useState, useEffect } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SelectCollabProps } from "@/interfaces/SelectCollabs";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { Collaborator } from "@/interfaces/Collaborator";

const SelectCollab = ({ collaborators, onSelect }: SelectCollabProps) => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [filteredCollaborators, setFilteredCollaborators] = useState(collaborators);

    useEffect(() => {
        setFilteredCollaborators(collaborators);
    }, [collaborators]);

    const handleSelect = (collaborator: Collaborator) => {
        setOpen(false);
        onSelect(collaborator);
        setFilteredCollaborators(filteredCollaborators.filter(collab => collab.id !== collaborator.id));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setInput(inputValue);

        const filtered = collaborators.filter(collab =>
            collab.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredCollaborators(filtered);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button onClick={() => setOpen(!open)} className="flex items-center justify-center text-white font-semibold mt-4 bg-roxoPrincipal hover:bg-blue-600 rounded-lg w-72 h-12">
                    <FaPlus /> <span className="ml-2">Adicionar</span>
                </button>
            </PopoverTrigger>
            <PopoverContent className="max-h-72 m-4 overflow-auto space-y-2">
                <p className="font-bold text-lg">Pesquise os colaboradores</p>
                <p className="font-regular">Para que você consiga realizar a avaliação 360</p>
                <div className="relative">
                    <input type="text" id="searchInput" name="searchInput" value={input} onChange={handleInputChange} className="w-full h-10 rounded-lg bg-buttonBlueBackground pl-4" placeholder="Pesquisar" />
                    <CiSearch className="absolute right-3 top-3 text-gray-400 stroke-1" />
                </div>
                <ul>
                    {filteredCollaborators.map((collaborator) => (
                        <li key={collaborator.id}>
                            <button onClick={() => handleSelect(collaborator)} className="flex items-center py-2 space-x-3 w-full rounded-sm hover:bg-gray-100">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span>{collaborator.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    );
};

export default SelectCollab;

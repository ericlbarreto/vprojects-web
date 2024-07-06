import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/interfaces/User";
import api from "@/services/axiosConfig";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";

const PartnerSearchBar = () => {
  const [search, setSearch] = useState("");
  const [availableCollaborators, setAvailableCollaborators] = useState<User[]>(
    []
  );

  useEffect(() => {
    const getCollabs = async () => {
      try {
        const response = await api.get("/api/user/all-collabs");
        setAvailableCollaborators(response.data);
      } catch (error) {
        console.error("Erro ao buscar os colaboradores:", error);
      }
    };

    getCollabs();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const navigate = useNavigate();
  const handleItemClick = (collaborator: User) => {
    navigate(`/home-socio/collaborator-control?id=${collaborator.id}`);
  };

  const filteredCollaborators = search
    ? availableCollaborators.filter((colaborador) =>
        colaborador.name?.toLowerCase().includes(search.toLowerCase())
      )
    : availableCollaborators;

  return (
    <DropdownMenu>
      <div className="relative">
        <div className="flex items-center relative">
          <DropdownMenuTrigger asChild>
            <Input
              type="text"
              className="bg-azulBackground border-none w-[512px] focus:outline-none focus:border-roxoPrincipal"
              placeholder="Pesquise o nome do colaborador"
              onChange={handleInputChange}
              value={search}
            />
          </DropdownMenuTrigger>
          <FaSearch className="text-cinza absolute right-4 cursor-pointer" />
        </div>

        <DropdownMenuContent className="absolute mt-2 w-96 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {filteredCollaborators.map((collaborator, index) => (
            <DropdownMenuItem
              key={index}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer gap-4"
              onClick={() => handleItemClick(collaborator)}
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{collaborator.name}</div>
                <div className="text-sm text-gray-500">
                  {collaborator.position}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

export default PartnerSearchBar;

import { columns } from "@/components/equalizationTable/columns";
import { EqualizationTable } from "@/components/equalizationTable/data-table";
import AreaGraphic from "@/components/graphics/areaGraphic";
import BarGraphic from "@/components/graphics/barGraphic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/authContext";
import { EqualizationCycle } from "@/interfaces/EqualizationCycle";
import api from "@/services/axiosConfig";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function CollaboratorControll() {
  const { getUserData } = useAuth();
  const user = getUserData();
  const location = useLocation();
  const [colabData, setColabData] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    sector: "",
    position: "",
    profilePhoto: "",
  });
  const [equalization, setEqualization] = useState<{ status: string }>({
    status: "Não iniciado",
  });
  const [equalizationCycles, setEqualizationCycles] = useState<
    EqualizationCycle[]
  >([]);
  const [collaboratorId, setCollaboratorId] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setCollaboratorId(queryParams.get("id"));

    const fetchData = async () => {
      try {
        const collaboratorResponse = await api.get(
          `/api/user/${collaboratorId}`
        );
        setColabData({
          name: collaboratorResponse.data.name,
          email: collaboratorResponse.data.email,
          sector: collaboratorResponse.data.sector,
          position: collaboratorResponse.data.position,
          profilePhoto: collaboratorResponse.data.profilePhoto,
        });

        const equalizationResponse = (
          await api.get(`/api/equalization/${user?.id}/${collaboratorId}`)
        ).data;
        if (equalizationResponse.length === 0) {
          setEqualization({ status: "Não iniciado" });
        } else {
          const isFinished = equalizationResponse.some(
            (eq: any) => eq.status === "Finalizado"
          );
          setEqualization({
            status: isFinished ? "Finalizado" : "Em andamento",
          });
        }
      } catch (error) {
        console.error(
          "Erro ao buscar os dados do colaborador ou equalização:",
          error
        );
      }
    };

    if (collaboratorId) {
      fetchData();
    }
  }, [location.search, user?.id]);

  useEffect(() => {
    const getEqualizationAndCycles = async () => {
      try {
        const equalizationsResponse = await api.get(
          "/api/cycles-equalization/all"
        );
        setEqualizationCycles(equalizationsResponse.data.reverse());
      } catch (error) {
        console.error("Erro ao buscar os ciclos de equalização:", error);
      }
    };

    getEqualizationAndCycles();
  }, []);

  return (
    <div className="h-full bg-azulBackground p-8">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col lg:flex-row items-center">
        <div className="flex-shrink-0">
          <Avatar className="h-24 w-24">
            <AvatarImage src={colabData.profilePhoto} />
            <AvatarFallback>{colabData.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-4 lg:mt-0 lg:ml-6 flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-bold">{colabData.name}</h2>
          <p className="text-sm text-gray-600">Cargo: {colabData.position}</p>
          <p className="text-sm text-gray-600">Setor: {colabData.sector}</p>
          <p className="text-sm text-gray-600">Email: {colabData.email}</p>
        </div>
        <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0 text-center lg:text-left">
          <p className="text-sm text-gray-600">Equalização</p>
          <p
            className={`${
              equalization.status === "Finalizado"
                ? "bg-green-100 text-green-600"
                : equalization.status === "Em andamento"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            } px-2 py-1 rounded`}
          >
            {equalization.status}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <AreaGraphic />
        </div>
        <div>
          <BarGraphic userId={Number(collaboratorId)} />
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-4 text-[#2D2D2D]">Histórico de Ciclos de Equalizações</h1>
        <div className="bg-white h-[400px]">
          <EqualizationTable columns={columns} data={equalizationCycles} />
        </div>
      </div>
    </div>
  );
}

export default CollaboratorControll;

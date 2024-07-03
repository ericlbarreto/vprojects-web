import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Certifique-se de ter estes componentes ou substitua-os por componentes equivalentes.

interface Equalization {
    id: number;
    status: string;
}

interface Address {
    district: string;
    city: string;
}

interface Collaborator {
    id: number;
    name: string;
    email: string;
    role: string;
    position: string;
    sector: string
    address: Address;
}

const mockCollaborator = {
    id: 1,
    name: "Catarina Leite Barros",
    email: "maria.silva@example.com",
    role: "UI/UX Designer",
    position: "UI/UX Designer",
    sector: "Executivos e Liderança",
    address: {
        district: "Centro",
        city: "São Paulo"
    }
};

const mockEqualization = {
    id: 1,
    status: "Finalizado",
};

function ControleColaborador() {
    const [colaborador, setColaborador] = useState<Collaborator | null>(mockCollaborator);
    const [equalization, setEqualization] = useState<Equalization | null>(mockEqualization);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCollaborator = async () => {
            try {
                
                setTimeout(() => {
                    setColaborador(mockCollaborator);
                    setEqualization(mockEqualization);
                }, 1000);
            } catch (error) {
                if (error instanceof Error) {
                    setError('Erro ao buscar colaborador: ' + error.message);
                } else {
                    setError('Erro desconhecido');
                }
            }
        };

        fetchCollaborator();
    }, []);
    

    if (error) {
        return <p>{error}</p>;  
    }

    if (!colaborador || !equalization) {
        return <p>No data available</p>;
    }

    return (
        <div className="sm:p-12 p-8">
            <div className="col-start-6 col-span-8 bg-white rounded-2xl shadow-md relative flex items-center p-6">
                <Avatar className="h-24 w-24 ml-4">
                    <AvatarImage src="https://github.com/shadcn.png" className="h-24 w-24" />
                    <AvatarFallback>{colaborador.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-6">
                    <p className="font-extrabold text-[#2d2d2d] text-2xl">
                        {colaborador.name}
                    </p>
                    <div className="text-textoCor text-sm space-y-1">
                        <p>Cargo: {colaborador.position}</p>
                        <p>Setor: {colaborador.sector}</p>
                        <p>Email: {colaborador.email}</p>
                    </div>
                </div>
                <div className="absolute top-8 right-12 text-textoCor text-sm">
                    <p className="mb-2">Equalização</p>
                    <p className="bg-green-100 text-green-600 px-2 py-1 rounded">{equalization.status}</p>
                </div>
            </div>
        </div>
    );
}

export default ControleColaborador;

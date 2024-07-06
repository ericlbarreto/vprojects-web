import { FinishModalProps } from "@/interfaces/finishModalProps";
import Done from "../assets/done.svg";
import api from "@/services/axiosConfig";

const FinishEqualization = ({ setFinishingEqualization, finishingEqualization, cycleId, path }: FinishModalProps) => {
    const handleFinishEqualization = async () => {
        try {
            await api.patch(`/api/cycles-equalization/${cycleId}`, {
                status: false,
            });
            setFinishingEqualization(false);
        } catch (error) {
            console.error("Error updating cycle status:", error);
        }
    };

    return (
        <div className="flex-col z-50 fixed bg-branco w-80 h-52 p-4 border-2 shadow rounded-sm">
            <div className="flex justify-center mb-2">
                <img className="size-12" src={Done} alt="Concluído" />
            </div>
            <div className="text-black text-sm justify-center font-semibold flex mb-2">Concluído!</div>
            <div className="text-[#727272] text-xs flex justify-center text-center mb-5">
                Ao clicar em "Encerrar equalização" o ciclo aberto de equalizações será finalizado.
            </div>
            <div className="flex justify-center space-x-4">
                <button onClick={() => setFinishingEqualization(false)} className="bg-[#EAEAEA] w-28 h-9 text-xs rounded-md text-black font-medium">
                    Cancelar
                </button>
                <a href={path}>
                    <button onClick={handleFinishEqualization} className="bg-roxoPrincipal w-28 h-9 text-xs rounded-md text-branco">
                        Continuar
                    </button>
                </a>
            </div>
        </div>
    );
};

export default FinishEqualization;

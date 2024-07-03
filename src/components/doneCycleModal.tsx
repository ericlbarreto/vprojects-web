import { format } from 'date-fns';
import { DoneCycleModal } from "@/interfaces/DoneCycleModal";
import Done from "../assets/done.svg";
import { postAv360 } from '@/services/restServices';
import { useAuth } from '@/contexts/authContext';
import { useNavigate } from 'react-router-dom';

const DoneCycle = ({ setDoneCycle, currentCycle, av360Data }: DoneCycleModal) => {
    const { getUserData } = useAuth();
    const user = getUserData();
    const navigate = useNavigate();

    const formattedEndDate = format(new Date(currentCycle.endDate), 'dd/MM/yyyy');

    const handleSend = async () => {
        const response = await postAv360(av360Data, user!.id, currentCycle!.id);
        if (response) {
            setDoneCycle(false);
            navigate({
                pathname: '/',
                search: '?doneToast=true',
            });
        }
    };

    return (
        <div className="flex-col z-50 fixed bg-branco w-80 h-52 p-4 border-2 shadow rounded-sm">
            <div className="flex justify-center mb-2"><img className="size-12" src={Done} alt="Done" /></div>
            <div className="text-black text-sm justify-center flex mb-2 font-semibold">Concluído!</div>
            <div className="text-[#727272] text-xs flex justify-center text-center mb-5">
                Ciclo de avaliações efetuado! Para edições, o prazo final é {formattedEndDate}.
            </div>
            <div className="flex justify-center space-x-4">
                <button onClick={() => setDoneCycle(false)} className="bg-[#EAEAEA] w-28 h-9 text-xs rounded-md text-black font-medium">Cancelar</button>
                <button onClick={() => { setDoneCycle(true); handleSend(); }} className="bg-roxoPrincipal w-28 h-9 text-xs rounded-md text-branco">Enviar</button>
            </div>
        </div>
    );
}

export default DoneCycle;

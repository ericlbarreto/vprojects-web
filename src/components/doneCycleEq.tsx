import Done from "../assets/done.svg";
import { useNavigate } from 'react-router-dom';

interface DoneCycleProps{
    setDoneCycle:Function;
    endDate: string
    name:string
}

const DoneCycleEq = ({ setDoneCycle, endDate, name}: DoneCycleProps) => {
    const navigate = useNavigate();

    const handleSend = async () => {
            setDoneCycle(false);
            navigate({
                pathname: '/controle-de-ciclo',
                search: '?doneToast=true',
        })
    };

    return (
        <div className="flex-col z-50 fixed bg-branco w-80 h-52 p-4 border-2 shadow rounded-sm">
            <div className="flex justify-center mb-2"><img className="size-12" src={Done} alt="Done" /></div>
            <div className="text-black text-sm justify-center flex mb-2 font-semibold">Concluído!</div>
            <div className="text-[#727272] text-xs flex justify-center text-center mb-5">
                Equalização de {name} concluída! Continue as demais equalizações deste ciclo, o prazo final é {endDate}.
            </div>
            <div className="flex justify-center space-x-4">
                <button onClick={() => setDoneCycle(false)} className="bg-[#EAEAEA] w-28 h-9 text-xs rounded-md text-black font-medium">Cancelar</button>
                <button onClick={() => { setDoneCycle(true); handleSend(); }} className="bg-roxoPrincipal w-28 h-9 text-xs rounded-md text-branco">Concluir</button>
            </div>
        </div>
    );
}

export default DoneCycleEq;

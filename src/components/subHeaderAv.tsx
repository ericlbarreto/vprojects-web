import { useLocation } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Stepper from "./steps";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { SubHeaderAvProps } from '@/interfaces/SubHeaderAvProps';
import SuccesToast from './succesToast';

function SubHeaderAv({currentStep, setAtencao, funcaoSalvar}:SubHeaderAvProps) {
    const location = useLocation();
    const currentPath = location.pathname;


    const notify = () => {
        toast.success('Informações salvas com sucesso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: { background: '#E4FFE4', width: '320px' },
        });
    };

    return (
        <>
            <div className="fixed w-screen bg-[#FBFCFF] h-32 flex justify-between px-4 z-30">
                <div className="m-4 ml-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <button onClick={() => setAtencao(true)}><BreadcrumbLink className="underline">Menu Principal</BreadcrumbLink></button>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {currentPath === '/autoavaliacao' ? (
                                    <BreadcrumbPage className='text-[#50556b] font-bold'>Autoavaliação</BreadcrumbPage>
                                ) : (
                                    <button onClick={() => setAtencao(true)}><BreadcrumbLink className="underline">Autoavaliação</BreadcrumbLink></button>
                                )}
                            </BreadcrumbItem>
                            {currentPath === '/autoavaliacao/avaliacao-360' && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className='text-[#50556b] font-bold'>Avaliação 360</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>

                    {currentPath === '/autoavaliacao' ? (
                        <p className="font-bold pt-2 text-2xl font-extrabold">Autoavaliação</p>
                    ) : (
                        <p className="font-bold pt-2 text-2xl font-extrabold">Avaliação 360</p>
                    )}
                </div>

                <div className="m-8"><Stepper stepNow={currentStep} /></div>

                <div className='flex items-center justify-end space-x-4 mr-4'>
                    <div>
                        <button onClick={() => {notify(); funcaoSalvar(true)}} className="bg-buttonBlueBackground w-36 h-12 rounded-md text-roxoPrincipal text-sm font-semibold hover:bg-[#e7edf5]">Salvar Rascunho</button>
                    </div>

                    {currentPath === '/autoavaliacao/avaliacao-360' && (
                        <div>
                            <button onClick={() => notify()} className="bg-roxoPrincipal w-36 h-12 rounded-md text-white text-sm font-semibold hover:bg-[#5C34FF]">Enviar ciclo</button>
                        </div>
                    )}
                </div>
            </div>
            <SuccesToast />
        </>
    )
}

export default SubHeaderAv;

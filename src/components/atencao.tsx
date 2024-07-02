import { AtencaoModalProps } from "@/interfaces/AtencaoModalProps";
import Atencao from "../assets/atencao.svg"

const AtencaoModal = ({setAtencao, path}: AtencaoModalProps) => {

    return (
        <div className="flex-col z-50 fixed bg-branco w-80 h-52 p-4 border-2 shadow rounded-sm">
            <div className="flex justify-center mb-2"><img className="size-12" src={Atencao} alt="Atenção" /></div>
            <div className="text-black text-sm justify-center flex mb-2">Atenção!</div>
            <div className="text-[#727272] text-xs flex justify-center text-center mb-5">Ao prosseguir sem clicar em "Salvar", você perderá todas as informações preenchidas.</div>
            <div className="flex justify-center space-x-4">
                <button onClick={()=>setAtencao(false)} className="bg-[#EAEAEA] w-28 h-9 text-xs rounded-md text-black">Cancelar</button>
                <a href={path}><button onClick={()=>setAtencao(false)} className="bg-roxoPrincipal w-28 h-9 text-xs rounded-md text-branco">Continuar</button></a>
            </div>
        </div>
    );
}

export default AtencaoModal;

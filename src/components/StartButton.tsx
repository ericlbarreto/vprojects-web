import { StartButtonProps } from "@/interfaces/StartButtonProps";


function StartButton({ className }: StartButtonProps) {
    return (
        <button className={`${className}`}>
            Iniciar
        </button>
    )
}

export default StartButton;
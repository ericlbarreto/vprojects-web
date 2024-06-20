import { useState } from "react";
import Info from "../assets/info.svg";
import { ToolTipInfoProps } from "@/interfaces/TooltipInfoProps";

const ToolTipInfo = ({ text }: ToolTipInfoProps) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    return (
        <div className="relative ml-3" onMouseEnter={() => setIsTooltipVisible(true)} onMouseLeave={() => setIsTooltipVisible(false)}>
            <img className="h-4 w-4" src={Info} alt="Info" />
            {isTooltipVisible && (
                <div className="absolute w-80 bg-[#F6FAFF] border rounded-sm shadow text-roxoPrincipal text-center font-medium text-sm p-2 -left-40 top-6 z-10">
                    <p>{text}</p>
                </div>
            )}
        </div>
    );
}

export default ToolTipInfo;

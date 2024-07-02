import SubHeaderEqualization from "@/components/subHeaderCycleControl";
import { useState } from "react";
import TutorialEqAv from "@/components/tutorialEqAv";
import EqAutoAv from "@/components/eqAutoAv";
import EqAv360 from "@/components/eqAv360";

function Equalization() {

    const [isSelfAval, setisSelfAval] = useState(false)

    return (
        <div className="h-full bg-azulBackground">
            <SubHeaderEqualization isSelfAval = {isSelfAval}/>
            <div className="pt-48">
                <TutorialEqAv/>
            </div>
            <div className="flex bg-branco w-80 h-16 ml-4 justify-between items-center shadow rounded-md">
                <div className="flex"><button className={`p-3 ml-2 h-12 ${!isSelfAval?"": "rounded-md font-semibold bg-[#F1F7FF] text-roxoPrincipal"}`} onClick={()=>setisSelfAval(true)}>Autoavaliação</button></div>
                <div className="flex"><button className={`p-3 mr-2 h-12 ${isSelfAval?"": "rounded-md font-semibold bg-[#F1F7FF] text-roxoPrincipal"}`} onClick={()=>setisSelfAval(false)}>Avaliação 360</button></div>
            </div>
            {isSelfAval? <EqAutoAv/>:<EqAv360/>}
        </div>
    );

}


export default Equalization;
import SubHeaderEqualization from "@/components/subHeaderCycleControl";
import { useState } from "react";

function Equalization() {

    const [isSelfAval, setisSelfAval] = useState(false)

    return (
        <div className="h-full bg-azulBackground">
            <SubHeaderEqualization isSelfAval = {isSelfAval}/>
        </div>
    );

}


export default Equalization;
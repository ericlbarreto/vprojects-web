import { Av360 } from "./Av360";
import { User } from "./User";
import { CurrentCycle } from "./CurrentCycle";

export interface SubHeaderAvProps {
    currentStep: number;
    setAtencao: (value: boolean) => void;
    atencao: boolean;
    allFieldsFilled?: boolean;
    currentCycle?: CurrentCycle;
    user?: User;
    funcaoSalvar?: (submitted: boolean) => void;
    av360Data?: { [key: number]: Av360 };
    onSubmitCycle?: (submitted: boolean) => void;
}

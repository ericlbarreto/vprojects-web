import { Av360 } from "./Av360";
import { Collaborator } from "./Collaborator";
import { CurrentCycle } from "./CurrentCycle";

export interface SubHeaderAvProps {
    currentStep: number;
    setAtencao: (value: boolean) => void;
    atencao: boolean;
    allFieldsFilled?: boolean;
    currentCycle?: CurrentCycle;
    user?: Collaborator;
    funcaoSalvar?: (submitted: boolean) => void;
    av360Data?: { [key: number]: Av360 };
    onSubmitCycle?: (submitted: boolean) => void;
}

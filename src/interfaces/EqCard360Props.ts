import { Av360 } from "./Av360";
import { Collaborator } from "./Collaborator";

export interface EqCard360Props {
    evaluator: Collaborator;
    av360Data: { [key: number]: Av360 };
    onExpandToggle: (id: number) => void;
    isExpanded: boolean;
}
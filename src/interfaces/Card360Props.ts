import { Collaborator } from "./Collaborator";
import { Av360 } from "./Av360"; // Certifique-se de importar corretamente Av360
export interface Card360Props {
    collaborator: Collaborator;
    onRemove: (collaborator: Collaborator) => void;
    onExpandToggle: (id: number) => void;
    isExpanded: boolean;
    onAv360FieldChange: (id: number, field: string, value: any) => void;
    av360Data: { [key: number]: Av360 };
}

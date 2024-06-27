import { Collaborator } from "./Collaborator";

export interface Card360Props {
    collaborator: Collaborator;
    onRemove: (collaborator: Collaborator) => void;
    onExpandToggle: (id: number) => void;
    isExpanded: boolean;
}
import { Collaborator } from "./Collaborator";

export interface SelectCollabProps {
    collaborators: Collaborator[];
    onSelect: (collaborator: Collaborator) => void;
}

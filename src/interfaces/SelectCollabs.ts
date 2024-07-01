import { Collaborator } from "./Collaborator";

export interface SelectCollabProps {
    collaborators: Collaborator[];
    disableAddCollab: boolean;
    onSelect: (collaborator: Collaborator) => void;
}

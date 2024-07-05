import { User } from "./User";

export interface SelectCollabProps {
    collaborators: User[];
    disableAddCollab: boolean;
    onSelect: (collaborator: User) => void;
}

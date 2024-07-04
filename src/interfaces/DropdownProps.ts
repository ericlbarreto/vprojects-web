import { Collaborator } from "./Collaborator";

export interface DropdownProps {
    user: Collaborator
    formattedBirthDate: string;
    closeDropdown: () => void;
}
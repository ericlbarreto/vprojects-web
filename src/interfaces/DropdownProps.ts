import { User } from "./User";

export interface DropdownProps {
    user: User
    formattedBirthDate: string;
    closeDropdown: () => void;
}
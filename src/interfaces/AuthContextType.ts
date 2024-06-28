import { Collaborator } from "./Collaborator";

export interface AuthContextType {
    login: (userData: Collaborator, token: string) => void;
    logout: () => void;
    getUserData: () => Collaborator | null;
}
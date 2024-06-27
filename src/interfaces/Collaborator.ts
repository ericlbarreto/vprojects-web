import { Address } from "./Address";

export interface Collaborator {
    id: number;
    email: string;
    name: string;
    role: string;
    position: string;
    address: Address;
}
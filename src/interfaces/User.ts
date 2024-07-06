import { Address } from "./Address";

export interface User {
    id: number;
    email: string;
    name?: string;
    password: string;
    role: string;
    address?: Address;
    position?: string;
    profilePhoto?: string;
    phoneNumber?: string;
    birthDate: Date;
    sector: string;
  }
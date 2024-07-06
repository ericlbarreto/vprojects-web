import { EqProps } from "./Equalizations";

export type EqCycle = {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    finalGrade?: number;
    status: boolean;
    Equalizations: [EqProps]
  };
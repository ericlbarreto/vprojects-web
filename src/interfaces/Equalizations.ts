import { EqScore } from "./EqScore";

export interface EqProps {

    id: number;
    evaluatorId: number;
    evaluatedId: number; 
    cycle: number; 
    cycleEqualizationId: number; 
    date: String;
    status: boolean; 
    finalGrade: number; 
    equalizationScore: [EqScore]

}
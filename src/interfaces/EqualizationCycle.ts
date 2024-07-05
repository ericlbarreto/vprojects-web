import { User } from "./User";

export interface EqualizationCycle {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: boolean;
  finalGrade: number;
  Equalizations: Equalization[];
}

export interface Equalization {
  id: number;
  evaluator: User;
  evaluatorId: number;
  evaluated: User;
  evaluatedId: number;
  cycleId: number;
  cycleEqualizationId: number;
  date: Date;
  status: boolean;
  finalGrade: number;
  EqualizationScores: EqualizationScore[];
}

export interface EqualizationScore {
  id: number;
  equalizationId: number;
  criterionId: number;
  grade: number;
}

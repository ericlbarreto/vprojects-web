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
  evaluatorId: number;
  evaluatedId: number;
  cycleId: number;
  cycleEqualizationId: number;
  date: string;
  status: boolean;
  finalGrade: number;
  equalizationScores: EqualizationScore[];
}

export interface EqualizationScore {
  id: number;
  equalizationId: number;
  criterionId: number;
  grade: number;
}

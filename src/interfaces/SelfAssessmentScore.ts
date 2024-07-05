export interface SelfAssessmentScore {
    id: number;
    selfAssessmentId: number;
    criterionId: number;
    grade: number;
    justification: string;
}
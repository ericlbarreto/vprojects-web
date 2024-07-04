export interface Cycle {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    status: boolean;
    finalGrade: number;
    SelfAssessments: SelfAssessment[];
    // PeerReviews: PeerReview[];
    // Equalizations: Equalization[];
  }
  
  export interface SelfAssessment {
    id: number;
    userId: number;
    cycleId: number;
    status: boolean;
    date: string;
    meanGrade: number;
    user: User;
    cycle: CycleSummary;
    SelfAssessmentScores: SelfAssessmentScore[];
  }
  
  export interface SelfAssessmentScore {
    id: number;
    selfAssessmentId: number;
    criterionId: number;
    grade: number;
    justification: string;
  }
  
  export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    role: string;
    position: string;
    profilePhoto: string;
  }
  
  export interface CycleSummary {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    status: boolean;
    finalGrade: number;
  }
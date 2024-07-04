export interface Av360 {
    evaluatorId: number;
    evaluatedId: number;
    cycleId: number;
    isFinished: boolean;
    assessment: {
        idReview: null;
        behavior: number;
        tecniques: number;
        toImprove: string;
        toPraise: string;
    }
}
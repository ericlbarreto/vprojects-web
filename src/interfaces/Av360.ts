export interface Av360 {
    evaluatorId: number
    evaluatedId: number
    cycleId: number
    assessment: {
        behavior: number
        tecniques: number
        toImprove: string
        toPraise: string
    }
}
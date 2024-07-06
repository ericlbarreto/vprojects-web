export interface FinishModalProps {

    finishingEqualization: boolean; 
    setFinishingEqualization: (value: boolean) => void;
    cycleId: number | string | undefined ;
    path: string

}
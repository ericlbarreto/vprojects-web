export interface GradeProps {
    isStatic: number;
    nota: number;
    funcaoNota: (value: number) => void;
    edit: boolean;
}

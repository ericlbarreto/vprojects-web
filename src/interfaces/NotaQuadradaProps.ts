export interface NotaQuadradaProps{
    isStatic: number;
    nota : string;
    funcaoHandleNota : Function;
    notasObject:{ [key: string]: number };
}
export interface NotaJustifEq{
    text:string;
    textInfo:string;
    nota:string;
    setNota:Function;
    notasObject: { [key: string]: number }
    justifiq:string
    notaColab:{ [key: string]: number };
    isFinished:boolean;
}
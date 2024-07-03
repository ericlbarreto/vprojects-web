export interface NotaJustifProps {
    text: string;
    textInfo: string;
    justif : string;
    funcaoJust : Function;
    nota : string;
    funcaoHandleNota: Function;
    notasObject: { [key: string]: number }
    justifObject: { [key: string]: string }

}
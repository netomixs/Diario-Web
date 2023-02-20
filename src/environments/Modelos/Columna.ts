import { Parcela } from "./Parcela";
import { Registro } from "./Registro";
import { Variedades } from "./Variedades";

export class Columna{
    parecela:Parcela
    registro:Registro;
        constructor(){
            this.parecela=new Parcela();
            this.registro=new Registro();
        }
}
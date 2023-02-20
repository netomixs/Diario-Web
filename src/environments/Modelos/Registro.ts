import { Surco } from "./Surco";

export class Registro{
    sincronizado:Boolean;
    id:string;
    promedio:number;
    parcela:String;
    completado:Boolean;
    listaSurcos:Surco[];
    constructor(){
        this.sincronizado=true;
        this.id=""
        this.promedio=0;
        this.parcela="";
        this.completado=false;
        this.listaSurcos=[];
       
    }
}
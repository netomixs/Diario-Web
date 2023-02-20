import { Tallo } from "./Tallo"

export class Surco{
    id:string | undefined;
    numero_surco:Number | undefined;
    cantidad_tallos:number ;
    tallosLista :Tallo[] | undefined;
    constructor(){
        this.cantidad_tallos=0;
    }
}
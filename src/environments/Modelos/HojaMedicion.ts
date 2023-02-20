import { Registro } from "./Registro";

export class HojaMedicion{
    id:string ;
    fechaCreacion:Date;
    mesCrecimiento:Number;
    experimento:string;
    sincronizado:boolean;
    completado:boolean;
    listaRegistros:Registro[];
    constructor(){
        this.id=""
        this.mesCrecimiento=0;
        this.fechaCreacion=new Date();
        this.experimento="";
        this.sincronizado=true;
        this.completado=false;
        this.listaRegistros=[]
    }
}
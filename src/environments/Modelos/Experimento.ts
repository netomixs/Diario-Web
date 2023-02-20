import { HojaMedicion } from "./HojaMedicion";
import { Parcela } from "./Parcela";
import { Variedades } from "./Variedades";

export class Experimento{
    id:string ;
    nombre:string ;
    inicio?:Date  ;
    fin?:Date ;
    variedadTestigo:string ;
    numeroVariedades:Number ;
    listaHojaMediciones?:HojaMedicion[] ;
    listaParcelas:Parcela[] ;
    listaVariedades:Variedades[] ;
    usuario?:string ;
    sincronizado:boolean ;
    configurado:boolean ;
    editableParcel:boolean ;
    editableRegistro:boolean ;
constructor(){
    this.id="" ;
    this.nombre="" ;
    this.inicio;
    this.fin;
    this.variedadTestigo="" ;
    this.numeroVariedades=0 ;
    this.listaHojaMediciones=[] ;
    this.listaParcelas=[];
    this.listaVariedades=[];
    this.usuario="" ;
    this.sincronizado=true ;
    this.configurado=true ;
    this.editableParcel=false ;
    this.editableRegistro=false ;
}
}
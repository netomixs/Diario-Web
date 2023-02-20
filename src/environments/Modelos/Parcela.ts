
export class Parcela{
    id:string ;
    variedad:string ;
    numero:number ;
    usuario:string ;
    posicion:number ;
    repeticion:Number ;
    editable:boolean ;
    constructor(){
        this.id="";
        this.variedad="";
        this.numero=0;
        this.usuario="";
        this.posicion=0;
        this.repeticion=0;
        this.editable=false;
    }
}
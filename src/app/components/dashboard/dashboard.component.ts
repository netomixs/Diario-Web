import { Component,OnInit, ViewChild,ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { FirebaseObjetService } from 'src/app/services/firebase-objet.service';
import { Usuario } from 'src/environments/Modelos/Usuario';
import { Experimento } from 'src/environments/Modelos/Experimento';
import { HojaMedicion } from 'src/environments/Modelos/HojaMedicion';
import { Registro } from 'src/environments/Modelos/Registro';
import { Parcela } from 'src/environments/Modelos/Parcela';
import { Variedades } from 'src/environments/Modelos/Variedades';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType, Color } from 'chart.js';
import { BaseChartDirective, } from 'ng2-charts';
import { Columna } from 'src/environments/Modelos/Columna';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { DatePipe } from '@angular/common';

//import jsPDF from 'jspdf';
const jspdf = require('jspdf');
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('grafica') pdfTable!: ElementRef;
usuario:Usuario =new Usuario;
ListaExperimentos:Experimento[];
columna:Columna[]=[]
objExperimentoSeleccionado:Experimento=new Experimento()
experimentoSeleccionado:string="";
hojaSeleccionada:string="";
numRepeticion:number=0;
pipe = new DatePipe('en-US');
repeticionSeleccionada:string=""
barCharDatos:ChartData<'bar'>= {datasets: [],
};
public barChartColors: Color[] =[]
colores=[]
repeticion1:Columna[]=[]
repeticion2:Columna[]=[]
repeticion3:Columna[]=[]
repeticion4:Columna[]=[]
ListaHoja:HojaMedicion[];
ListaPercelas:Parcela[]=[];
ListaVariedad:Variedades[]=[];
objHojaSeleccionada:HojaMedicion;


public barChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: {
    x: {},
    y: {
      min: 0,
      max:300

    }
  },plugins:{
    legend:{
      display:true,
    }, datalabels: {
      anchor: 'end',
      align: 'end'
    }
  }

};
public barChartType: ChartType = 'bar';
public barChartPlugins = [
  DataLabelsPlugin
];
altura:boolean=true;
  constructor(private afAuth:AngularFireAuth,
              private router: Router,
              private db:AngularFireDatabase,
              private fireBaseGetData:FirebaseObjetService,){
                this.ListaExperimentos=[]
                this.ListaHoja=[]
                this.objHojaSeleccionada=new HojaMedicion()
                //se llama la funcion encargada de cargar los datos de experimentos pas su uso en este componente
            
                
              }

ngOnInit(): void {

}
ngDoCheck(){
 // this.getValueWithPromise()



  //
}
ngAfterContentInit(){
 
  if(localStorage.getItem("experimentos")){
    this.ListaExperimentos=JSON.parse(localStorage.getItem("experimentos")?.toString()+"")
    console.log(this.ListaExperimentos);
   }else{
    console.log("Fallo")
   }
   this.asignarDatos()
}
//Cierre de sesion
CerrarSesion() {
//Borro todo lo almacenando en memoria
 localStorage.clear()
//Termino sesion en firebase y redirecciono a login
  this.afAuth.signOut().then(()=>this.router.navigate(['/login']))
}


async  cargarExperimento() {
  //Se busca un metodo async para que trabaje sin afectar al componente
  return new Promise(resolve => {
    console.log("Se entro en la promesa")
    //Se lee lo que este en localStorge
      var da=localStorage.getItem("experimentos")
      if(da!=null){
    //Se aasigana a las lista de experimentos contenida en el componente cargada desde localStorge
        this.ListaExperimentos=JSON.parse(localStorage.getItem("experimentos")?.toString()+"")
        this.usuario=JSON.parse(localStorage.getItem("datos")?.toString()+"");
    //Si se recuperaron los datos se retorna true
        resolve(true)
      }else{
        setTimeout(() => {
              //Si no se recuperaron los datos se retorna false y se espera ("n" En analisis) segundos
          console.log("Esto se ejecuto")
              resolve(false)
        }, 2000);

      }
    
    
  });
}
async asignarDatos(){
  this.cargarExperimento().then(e=>{
  //si al cargar el experimento retorna true no hacer nada
      if(e){
      }else{
  //En caso contrario se vuelve a llamar la funcion
        this.cargarExperimento()
      }
  })
}
numeroVariedades(experimento:Experimento){
    var num =experimento.listaVariedades.length-1;
    return num;
}
// Funcion que se ejecuta en dar en un componente de la lista deplegada en el Html
mostraHoja(id: any){
  //Si es el caso se busca por id el elemnto que se selecciono anteriormente
  //Si no hay algun componente seleccionado no pasara nada
  document.getElementById(this.hojaSeleccionada)?.classList.remove('active');
  
  this.hojaSeleccionada=""
  this.repeticionSeleccionada=""
  this.objHojaSeleccionada=new HojaMedicion()
  const componeteAnterior = document.getElementById(this.experimentoSeleccionado);
  const componentCollapAnterior=document.getElementById(this.experimentoSeleccionado+"collapse")
  // al componente anterior se le remueve la clase css 
  componeteAnterior?.classList.remove('active')
  componentCollapAnterior?.classList.remove('show')
  document.getElementById(this.hojaSeleccionada)?.classList.remove('active');
// Cuando se de en el componente se recupera la id de este y se le asictanar a experimento seleccionado
this.experimentoSeleccionado=id
// al componente seleccionado se le da la calse active
const componeteActual = document.getElementById(this.experimentoSeleccionado);
const componentCollapActual= document.getElementById(this.experimentoSeleccionado+"collapse")
componeteActual?.classList.add('active')
componentCollapActual?.classList.add('show')
//De los experiemntos cargados se busca al elemento que id coincida con el seleccionado
this.ListaExperimentos.forEach(element => {
    if(element.id==this.experimentoSeleccionado){
      // al encontrarlo se comprueba que no este vacio
     if(element.listaHojaMediciones){
      //de este experimento se llenara la lista Lista Hoja
      this.ListaHoja=element.listaHojaMediciones
      //Se ordena la lista para dar una mejor presentacion, del posibel desorden del usuario
      this.ListaHoja=this.ordenarListaHojas(this.ListaHoja)
      // Esta lista se mostrara en todos los experimento con el que el id corresponda con el seleccionado
      this.ListaPercelas=element.listaParcelas;
      this.objExperimentoSeleccionado=element
      this.ListaVariedad=element.listaVariedades;
      this.ListaVariedad.forEach(i=>{
              var strColor=i.color;   
         if(strColor && strColor.length>7){
           strColor="#"+strColor.substring(3,strColor.length-1)+"0"
           i.color=strColor;
        }
      })
      console.log(this.ListaVariedad)
     }   

    }
});
}
refrescarDatos(){
this.fireBaseGetData.getDatosUsuario();
setTimeout(() => {
  //Si no se recuperaron los datos se retorna false y se espera ("n" En analisis) segundos
console.log("Esto se ejecuto")
this.cargarExperimento();
}, 2000);
}
mostraRepeticiones(id: any){
this.repeticionSeleccionada=""
this.objHojaSeleccionada=new HojaMedicion();
const componeteAnterior = document.getElementById(this.hojaSeleccionada);
const componentCollapAnterior=document.getElementById(this.hojaSeleccionada+"collapse")
document.getElementById('encabezado')?.classList.remove('collapse');
// al componente anterior se le remueve la clase css 
componeteAnterior?.classList.remove('active')
componentCollapAnterior?.classList.remove('show')
// Cuando se de en el componente se recupera la id de este y se le asictanar a experimento seleccionado
this.hojaSeleccionada=id
// al componente seleccionado se le da la calse active
const componeteActual = document.getElementById(this.hojaSeleccionada);
componeteActual?.classList.add('active')
this.ListaPercelas= this.objExperimentoSeleccionado.listaParcelas;
this.ListaHoja.forEach(hoja=>{
  if(hoja.id==this.hojaSeleccionada){
    this.objHojaSeleccionada=hoja;
    var registros=this.objHojaSeleccionada.listaRegistros
    this.repeticion1=[]
    this.repeticion2=[]
    this.repeticion3=[]
    this.repeticion4=[]
    document.getElementById('ordenPosicion')?.classList.add('active')
    document.getElementById('ordenVariedad')?.classList.remove('active')
    document.getElementById('R1')?.classList.add('active')
    document.getElementById('altura')?.classList.add('active')
    var i=0;
    registros?.forEach(r=>{
      if(r.parcela?.includes("R1")){
        this.repeticion1.push({parecela:this.ListaPercelas[i],registro:r})
      }
      if(r.parcela?.includes("R2")){
        this.repeticion2.push({parecela:this.ListaPercelas[i],registro:r})
      }
      if(r.parcela?.includes("R3")){
        this.repeticion3.push({parecela:this.ListaPercelas[i],registro:r})
      }
      if(r.parcela?.includes("R4")){
        this.repeticion4.push({parecela:this.ListaPercelas[i],registro:r})
      }
      i++;
    })
    this.ordenarPorVariedad()
   console.log(registros)
   this.generargrafica(this.repeticion1,0)

  
  }
})

//componentCollapActual?.classList.add('show')
}
asicnarTipo(id:string){
  document.getElementById("altura")?.classList.remove('active');
  document.getElementById("numero")?.classList.remove('active');
  if(id=="altura"){
      this.altura=true;
      document.getElementById("altura")?.classList.add('active');
      this.chart?.update();

  }
   if(id=="numero"){
    this.altura=false;
    document.getElementById("numero")?.classList.add('active');
    this.chart?.update();
  }
  if( document.getElementById("R1")?.classList.contains('active')){
    this.asignarRepeticion('R1');
    this.repeticionSeleccionada="1";
  }
  if( document.getElementById("R2")?.classList.contains('active')){
    this.asignarRepeticion('R2');
    this.repeticionSeleccionada="2";
  }
  if( document.getElementById("R3")?.classList.contains('active')){
    this.asignarRepeticion('R3');
    this.repeticionSeleccionada="3";
  }
  if( document.getElementById("R4")?.classList.contains('active')){
    this.asignarRepeticion('R4');
    this.repeticionSeleccionada="4";
  }
  
}
asignarRepeticion(id:string){
  document.getElementById("R1")?.classList.remove('active');
  document.getElementById("R2")?.classList.remove('active');
  document.getElementById("R3")?.classList.remove('active');
  document.getElementById("R4")?.classList.remove('active');
  document.getElementById("R5")?.classList.remove('active');

  switch(id){
    case 'R1':
      document.getElementById("R1")?.classList.add('active');
      this.generargrafica(this.repeticion1,0);
      this.repeticionSeleccionada="1";
    break;
    case 'R2':
      document.getElementById("R2")?.classList.add('active');
      this.generargrafica(this.repeticion2,1);
      this.repeticionSeleccionada="2";
    break;
    case 'R3':
      document.getElementById("R3")?.classList.add('active');
      this.generargrafica(this.repeticion3,2);
      this.repeticionSeleccionada="3";
    break;
    case 'R4':
      document.getElementById("R4")?.classList.add('active');
      this.generargrafica(this.repeticion4,3);
      this.repeticionSeleccionada="4";
    break;
    case 'R5':
      document.getElementById("R5")?.classList.add('active');
    break;
    default:
      break;
  }
}

ordenarPorVariedad(){
  document.getElementById('contenedro_OpOrden')?.classList.remove('show');
  document.getElementById('ordenVariedad')?.classList.add('active');
  document.getElementById('ordenPosicion')?.classList.remove('active');
  this.repeticion1=this.ordenarRepeticionPorVariedad(this.repeticion1);
  this.repeticion2=this.ordenarRepeticionPorVariedad(this.repeticion2);
  this.repeticion3=this.ordenarRepeticionPorVariedad(this.repeticion3);
  this.repeticion4=this.ordenarRepeticionPorVariedad(this.repeticion4);
  if( document.getElementById("R1")?.classList.contains('active')){
    this.asignarRepeticion('R1');
    this.repeticionSeleccionada="1";
  }
  if( document.getElementById("R2")?.classList.contains('active')){
    this.asignarRepeticion('R2');
    this.repeticionSeleccionada="2";
  }
  if( document.getElementById("R3")?.classList.contains('active')){
    this.asignarRepeticion('R3');
    this.repeticionSeleccionada="3";
  }
  if( document.getElementById("R4")?.classList.contains('active')){
    this.asignarRepeticion('R4');
    this.repeticionSeleccionada="4";
  }
  
  this.chart?.update();
}
ordenarPorPosicion(){
  document.getElementById('contenedro_OpOrden')?.classList.remove('show');
  document.getElementById('ordenVariedad')?.classList.remove('active');
  document.getElementById('ordenPosicion')?.classList.add('active');
  this.repeticion1=this.ordenarRepeticionPorPosicion(this.repeticion1)
  this.repeticion2=this.ordenarRepeticionPorPosicion(this.repeticion2)
  this.repeticion3=this.ordenarRepeticionPorPosicion(this.repeticion3)
  this.repeticion4=this.ordenarRepeticionPorPosicion(this.repeticion4)
  if( document.getElementById("R1")?.classList.contains('active')){
    this.asignarRepeticion('R1');
  }
  if( document.getElementById("R2")?.classList.contains('active')){
    this.asignarRepeticion('R2');
  }
  if( document.getElementById("R3")?.classList.contains('active')){
    this.asignarRepeticion('R3');
  }
  if( document.getElementById("R4")?.classList.contains('active')){
    this.asignarRepeticion('R4');
  }
  
  this.chart?.update();
}
//--------------------------Ordenacion de listas-------------------------
ordenarRepeticionPorVariedad(r:Columna[]){
r.sort(function(a,b){
      if(a.parecela.numero<b.parecela.numero){
        return -1;
      }
      else if(a.parecela.numero>b.parecela.numero){
          return 1;
      }
      else{
        return 0;
      }
})
return r;
}
 recuperarNombreTestigo(testigo :string|undefined ){
  for(var i=0;i<this.objExperimentoSeleccionado.listaVariedades.length;i++){
        if(this.objExperimentoSeleccionado.listaVariedades[i].id==testigo){
            return this.objExperimentoSeleccionado.listaVariedades[i].tratamiento;
        }
  }
  return "";
}
ordenarRepeticionPorPosicion(r:Columna[]){
  r.sort(function(a,b){
        if(a.parecela.posicion<b.parecela.posicion){
          return -1;
        }
        else if(a.parecela.posicion>b.parecela.posicion){
            return 1;
        }
        else{
          return 0;
        }
  })
  return r;
  }
//Ordena la lista hoja
ordenarListaHojas(hojas:HojaMedicion[]){
  hojas.sort(function(a,b){
    if(a.mesCrecimiento<b.mesCrecimiento){
      return -1;
    }else if(a.mesCrecimiento>b.mesCrecimiento){
        return 1;
    }else{
      return 0
    }
  });
  return hojas;
  }
desplegarOpOrden(){
  document.getElementById('contenedro_OpOrden')?.classList.add('show');

}

generargrafica(repeticion:Columna[],num:number){
  var datos:number[]=[]
  var etiquetas:string[]=[];
  var color:string[]=[];
  for(var i=0;i<repeticion.length;i++){
   
    if(this.altura){
      datos.push(Number (repeticion[i].registro.promedio.toFixed(2)))
    }else{
      var promedio=(repeticion[i].registro.listaSurcos[0].cantidad_tallos+repeticion[i].registro.listaSurcos[1].cantidad_tallos)/2;
      datos.push(Number(promedio.toFixed()))
    }
   etiquetas.push(this.ListaVariedad[repeticion[i].parecela.numero-1].tratamiento+"")
   /*
   if(strColor){
    strColor="#"+strColor.substring(3,strColor.length-1)+"0"
   }
    

   */
   var strColor=this.ListaVariedad[repeticion[i].parecela.numero-1].color+"";
   color.push(strColor)
  }

  this.barCharDatos.labels=[]
  this.barCharDatos.datasets=[]
  this.barCharDatos.labels=etiquetas;
  console.log(color)
  this.barCharDatos.datasets.push({data:datos,backgroundColor:color,label:"Valor",minBarLength:1})
  this.chart?.update();
}
downloadPDF() {
  // Extraemos el
 
  var DATA = document.getElementById('htmlData');
 const doc = new jspdf('p', 'pt', 'a4');
  const options = {
    background: 'white',
    scale: 3
  };
if(DATA!=null){
  html2canvas(DATA, options).then((canvas) => {

    const img = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDF
    const bufferX = 15;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    return doc;
  }).then((docResult) => {
    if(this.objExperimentoSeleccionado.nombre!=null &&this.objHojaSeleccionada.mesCrecimiento!=null){
      docResult.save(this.objExperimentoSeleccionado.nombre+" Mes"+this.objHojaSeleccionada.mesCrecimiento+"R"+this.repeticionSeleccionada);
      this.objExperimentoSeleccionado.variedadTestigo;
    }
  });
}

}

/////////////////////////Rdeondear numero funcion (Temporal)//////////////////////////////////////////////

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Usuario } from 'src/environments/Modelos/Usuario';
import { elementAt, map, Observable } from 'rxjs';
import { Experimento } from 'src/environments/Modelos/Experimento';
import { HojaMedicion } from 'src/environments/Modelos/HojaMedicion';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
@Injectable({
  providedIn: 'root'
})
export class FirebaseObjetService {
  usuario:any;
  UsuarioDatos:Usuario | undefined
  experimentoList:Experimento[] 
  isLoad:boolean=false;
  //  itemsRef: AngularFireList<any>;

//  itemsRef: AngularFireList<any>;
  constructor(private db:AngularFireDatabase,
    private afAuth:AngularFireAuth,private router: Router) { 
       //Recupero obj de usuario almacenado y compruebo que exista 
      if(localStorage.getItem('user')!=null){
        this.usuario=localStorage.getItem('user')
        this.usuario=JSON.parse(this.usuario)
      }else{
        //Si no existe el usuario en memeoria lo recupero desde Firebase
        this.afAuth.currentUser.then(user=>{
          if(user && user.emailVerified){
              this.usuario=user
              localStorage.setItem('user',JSON.stringify( this.usuario))
             this.getDatosUsuario()
          }else{
            //Si el objeto usuario no existe en firebase(Logueado) y no esta en memoria se redirecciona al login
            this.router.navigate(['/login'])
          }
        })
      }
    //  this.itemsRef = db.list('usuarios');

   /*   this.itemsRef.snapshotChanges(['child_added'])
      .subscribe(actions => {
        actions.forEach(action => {
          
          console.log(action.key);
          console.log(action.payload.val());
        });
      });*/
 
      this.experimentoList=[]
    }
    getUsuario(){
      return this.usuario
    }
    //Retorna un objeto tipo Usuario
    getDatosUsuario(){
    var strUser
    var idUser=this.usuario.email;
    //Se remplaza los punto en el correo / Asi se designo que se generaria el di en base al coreo (Pendiente nueva forma de id)
    idUser=idUser.replace('.',"_")
    // Se asigna la ruta donde se encuentran los datos del usuario
    var itemsRef = this.db.object('usuarios/'+idUser);
    //Acceso a los datos retornados por firebase
    itemsRef.snapshotChanges().subscribe(actions => {
      //Se convierte los datos resividos de tipo String al tipo usuario
      strUser=actions.payload.val()
      this.UsuarioDatos=JSON.parse(strUser+"")
      console.log(this.UsuarioDatos?.id)
     
     localStorage.setItem("datos",JSON.stringify(this.UsuarioDatos))
     this.getListaExperimentos()
      return this.UsuarioDatos
    });
      
   
    }

   getListaExperimentos(){
    this.experimentoList=[]
    var idEx
    var idUsuario=this.UsuarioDatos?.id
    var itemIdExperimnto=this.db.list(idUsuario+'/experimentos/')
    itemIdExperimnto.snapshotChanges(['child_added']).subscribe(actions=>{
    actions.forEach(element => {
      idEx=element.key
      if(idEx && idUsuario){
        this.getDatosExperimento(idEx,idUsuario);
       // localStorage.setItem("experimentos",JSON.stringify(this.experimentoList))
        console.log(idEx);
      }
      });
      this.isLoad=true;
      console.log(this.isLoad)
  
    })

return this.experimentoList
  } 
  getDatosExperimento(idExperimento:string,idUsuario:String){
    var datosExperimentoStr:string;
    var varexperimento: Experimento;
    var datosHojaRegistroStr:string;
    var varHoja:HojaMedicion;
    var itemDatosHojaMedicion=this.db.list(idUsuario+'/experimentos/'+idExperimento+"/HojaRegistros/");
    var itemDatosExperimento=this.db.object(idUsuario+'/experimentos/'+idExperimento+"/experimento/")
    itemDatosExperimento.snapshotChanges().subscribe(actions=>{
      datosExperimentoStr=actions.payload.val()+""
      if(datosExperimentoStr){
        varexperimento=JSON.parse(datosExperimentoStr)
        itemDatosHojaMedicion.snapshotChanges().subscribe(data=>{
            data.forEach(elementAt=>{
              datosHojaRegistroStr=elementAt.payload.val()+""
              if(datosHojaRegistroStr){
                  varHoja=JSON.parse(datosHojaRegistroStr)
                  varexperimento.listaHojaMediciones?.push(varHoja)
                  localStorage.setItem("experimentos",JSON.stringify(this.experimentoList))
              }
              
            })
            
        })
        
      }
    this.experimentoList?.push(varexperimento)
    localStorage.setItem("experimentos",JSON.stringify(this.experimentoList))
    
    })
   // localStorage.setItem("experimentos",JSON.stringify(this.experimentoList))
   
  } 
  
}

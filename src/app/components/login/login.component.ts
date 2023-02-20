import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {AngularFireAuth}from '@angular/fire/compat/auth'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLogin:FormGroup;
  loading:boolean =false
  constructor(private fb: FormBuilder,
    private afAuth:AngularFireAuth,
    private toastr: ToastrService,
    private router:Router,
    private firebaseCodeError:FirebaseErrorService
    
    ){
    this.formLogin=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['', Validators.required]
    })

  }
  ngOnInit(): void {
    
  }
  ingresar(){
    const email=this.formLogin.value.email
    const password=this.formLogin.value.password

    this.loading=true

    this.afAuth.signInWithEmailAndPassword(email,password).then((user)=>{
      
        if(user.user?.emailVerified){
            this.router.navigate(['/dashboard'])
        }else{
        this.toastr.info("Para poder acceder es necesario la verifiacion de correo.\n "+
        "Se ha enviado un correo. Por favor revise su buzon","Correo no verificado")
          this.loading=false
        }
        
    }).catch((error)=>{
      this.loading=false
      this.toastr.error(  this.firebaseCodeError.firebaseCodeError(error.code),'Error')
   
    })
  }

}

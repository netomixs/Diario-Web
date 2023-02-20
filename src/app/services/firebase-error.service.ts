import { Injectable } from '@angular/core';
import { firebaseCodeErrorEnum } from 'utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {
  firebaseCodeError(code: string) {
    switch(code){
      //contrasena incorrecta
      case firebaseCodeErrorEnum.PassworisWrong:
        return 'Contraseña incorrecta'
      //correo no exite
      case firebaseCodeErrorEnum.EmailNoFound:
        return 'El correo no existe'
        default:
          return "Error inesperado"
    }
   
  }

  constructor() { }
}

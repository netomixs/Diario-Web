import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorreoNOVerificadoComponent } from './components/correo-no-verificado/correo-no-verificado.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'verificar-correo',component:CorreoNOVerificadoComponent},
  {path:'recuperar-password',component:RecuperarPasswordComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'**',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

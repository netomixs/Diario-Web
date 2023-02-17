import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Modulos
import { AppRoutingModule } from './app-routing.module';
import{AngularFireModule}from '@angular/fire/compat'
import{AngularFireDatabaseModule}from'@angular/fire/compat/database'
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CorreoNOVerificadoComponent } from './components/correo-no-verificado/correo-no-verificado.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CorreoNOVerificadoComponent,
    RecuperarPasswordComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,// required animations module
    ToastrModule.forRoot(),// ToastrModule added
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ColorPickerModule,
    NgChartsModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

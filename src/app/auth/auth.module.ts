import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http"

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './../core/core.module'
import { PrimengModule } from '../primeng/primeng.module';
import { ResetComponent } from './components/reset/reset.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    PrimengModule
  ]
})
export class AuthModule { }

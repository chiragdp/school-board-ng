import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { primeModules } from './prime-modules';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    ...primeModules,
  ],
  providers: [MessageService],
})
export class AuthModule {}

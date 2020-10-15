import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from './auth-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: '',
        redirectTo: '/auth/login'
      }
    ]
  }
]

@NgModule({
  declarations: [AuthPageComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class AuthPageModule { }

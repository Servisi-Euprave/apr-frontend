import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [() => !inject(AuthService).isJwtValid()],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [() => !inject(AuthService).isJwtValid()],
  },
  { path: 'companies', component: CompaniesComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [
      () => {
        if (!inject(AuthService).isJwtValid()) {
          inject(Router).navigate(['login']);
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

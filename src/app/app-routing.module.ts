import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth/auth.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [() => !inject(AuthService).isJwtValid()],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'companies', component: CompaniesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

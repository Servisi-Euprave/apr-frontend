import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { Credentials } from '../model/credentials';
import { HttpAuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private httpAuthServ: HttpAuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private AuthService: AuthService
  ) {
    this.serviceId = null;
    this.redirectUrl = null;
  }

  serviceId: string | null;
  redirectUrl: string | null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((qParams) => {
      this.serviceId = qParams.get('service');
      this.redirectUrl = qParams.get('redirect_url');

      if (this.AuthService.isJwtValid()) {
        if (this.redirectUrl) {
          this.httpAuthServ
            .ssoLogin(this.serviceId)
            .subscribe((jwt) => this.ssoRedirect(jwt));
        }
        this.router.navigate(['profile']);
      }
    });
  }

  ssoRedirect(token: string) {
    let clientUrl = new URL(this.redirectUrl!!);
    clientUrl.searchParams.append('token', token);
    window.location.href = clientUrl.toString();
  }

  credentialsForm = new FormGroup({
    pib: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    let pib: string = this.credentialsForm.value.pib ?? '';
    let password: string = this.credentialsForm.value.password ?? '';
    let credentials: Credentials = {
      pib: pib,
      password: password,
    };

    this.httpAuthServ.login(credentials).subscribe({
      next: (result) => {
        localStorage.setItem('jwt', result);
        this.toastr.success('Login successful.');
        this.router.navigate(['']);
        if (this.redirectUrl !== null) {
          this.ssoRedirect(result);
        }
      },
      error: () => {
        this.toastr.error('Invalid credentials');
      },
    });
  }
}

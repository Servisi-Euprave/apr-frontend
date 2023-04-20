import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from '../model/credentials';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.serviceId = null;
    this.redirectUrl = null;
  }

  serviceId: string | null;
  redirectUrl: string | null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (qParams) => (this.serviceId = qParams.get('service'))
    );
    this.route.queryParamMap.subscribe(
      (qParams) => (this.redirectUrl = qParams.get('redirect_url'))
    );
  }

  credentialsForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    let username: string = this.credentialsForm.value.username ?? '';
    let password: string = this.credentialsForm.value.password ?? '';
    let credentials: Credentials = {
      username: username,
      password: password,
      service: this.redirectUrl ? this.serviceId : null,
    };

    this.authService.login(credentials).subscribe({
      next: (result) => {
        localStorage.setItem('jwt', result);
        if (this.redirectUrl !== null) {
          let clientUrl = new URL(this.redirectUrl);
          clientUrl.searchParams.append('token', result);
          window.location.href = clientUrl.toString();
        }
      },
      error: () => {
        this.toastr.error('Invalid credentials');
      },
    });
  }
}

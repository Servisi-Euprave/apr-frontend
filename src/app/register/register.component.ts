import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(72),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]{4,20}'),
    ]),
    phone: new FormControl('', Validators.pattern(/^\+?[1-9]\d{1,14}$/)),
    email: new FormControl('', Validators.email),
    sex: new FormControl('', sexValidator()),
    address: new FormControl('', Validators.maxLength(100)),
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    jmbg: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{13}$/),
    ]),
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.serviceId = null;
    this.redirectUrl = null;
  }

  get name() {
    return this.registrationForm.controls.name;
  }
  get lastname() {
    return this.registrationForm.controls.lastname;
  }
  get email() {
    return this.registrationForm.controls.email;
  }
  get address() {
    return this.registrationForm.controls.address;
  }
  get phone() {
    return this.registrationForm.controls.phone;
  }
  get jmbg() {
    return this.registrationForm.controls.jmbg;
  }
  get password() {
    return this.registrationForm.controls.password;
  }
  get username() {
    return this.registrationForm.controls.username;
  }
  get sex() {
    return this.registrationForm.controls.sex;
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

  onSubmit() {
    let user: User = {
      username: this.registrationForm.value.username ?? '',
      password: this.registrationForm.value.password ?? '',
      phone: this.registrationForm.value.phone ?? '',
      email: this.registrationForm.value.email ?? '',
      sex: this.registrationForm.value.sex ?? '',
      address: this.registrationForm.value.address ?? '',
      name: this.registrationForm.value.name ?? '',
      lastname: this.registrationForm.value.lastname ?? '',
      jmbg: this.registrationForm.value.jmbg ?? '',
    };

    this.userService.register(user).subscribe({
      next: (result) => {
        this.toastr.info(
          'You have been successfully registered. Please log in to access your account'
        );
        localStorage.setItem('jwt', result);
        if (this.redirectUrl !== null) {
          let clientUrl = new URL(this.redirectUrl);
          clientUrl.searchParams.append('token', result);
          window.location.href = clientUrl.toString();
        }
      },
      error: (e) => {
        if (e instanceof HttpErrorResponse) {
          e as HttpErrorResponse;
          if (e.status === 0) {
            console.error(e);
            this.toastr.error('An error occured in the browser.');
            return;
          }
        }
        console.error(e);
        this.toastr.error('Username or JMBG already taken.');
      },
    });
  }
}

export function sexValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return ['MALE', 'FEMALE'].some((e) => e === control.value)
      ? null
      : { sex: { value: control.value } };
  };
}

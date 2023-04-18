import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

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

  onSubmit() {}
}

export function sexValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return ['MALE', 'FEMALE'].some((e) => e === control.value)
      ? null
      : { sex: { value: control.value } };
  };
}

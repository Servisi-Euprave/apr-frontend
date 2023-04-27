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
import { Company, Delatnost, NSTJ } from '../model/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm = new FormGroup({
    jmbg: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{13}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(72),
    ]),
    naziv: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    mesto: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    postanskiBroj: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    delatnost: new FormControl<Delatnost | null>(null, Validators.required),
    sediste: new FormControl<string>('', Validators.required),
  });

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.serviceId = null;
    this.redirectUrl = null;
  }

  serviceId: string | null;
  redirectUrl: string | null;

  private _delatnostiKeys: Delatnost[] = Object.values(Delatnost);
  public get delatnostiKeys(): Delatnost[] {
    return this._delatnostiKeys;
  }

  private _validNstj: NSTJ[] = [];
  public get validNstj(): NSTJ[] {
    return this._validNstj;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (qParams) => (this.serviceId = qParams.get('service'))
    );
    this.route.queryParamMap.subscribe(
      (qParams) => (this.redirectUrl = qParams.get('redirect_url'))
    );
    this.companyService.findAllNstj().subscribe({
      next: (result) => {
        this._validNstj = result;
      },
    });
  }

  onSubmit() {
    let company: Company = {
      password: this.registrationForm.value.password!!,
      vlasnik: {
        jmbg: this.registrationForm.value.jmbg!!,
        name: '',
        lastname: '',
      },
      pib: 0,
      naziv: this.registrationForm.value.naziv ?? '',
      adresaSedista: this.registrationForm.value.address ?? '',
      mesto: this.registrationForm.value.mesto ?? '',
      postanskiBroj: this.registrationForm.value.postanskiBroj ?? '',
      delatnost: this.registrationForm.value.delatnost!!,
      sediste: {
        oznaka: this.registrationForm.value.sediste!!,
        naziv: '',
      },
    };

    this.companyService.register(company).subscribe({
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
            this.toastr.error('An error occured in the browser.');
            return;
          }
          if (e.status >= 400 && e.status < 500) {
            e.statusText;
            console.log(e);
            this.toastr.error(e.message);
            return;
          }
          this.toastr.error('We have made an oopsie-woopsie');
          return;
        }
        console.error(e);
        this.toastr.error('Catastrophic failure.');
      },
    });
  }

  get naziv() {
    return this.registrationForm.controls.naziv;
  }
  get delatnost() {
    return this.registrationForm.controls.delatnost;
  }
  get mesto() {
    return this.registrationForm.controls.mesto;
  }
  get address() {
    return this.registrationForm.controls.address;
  }
  get sediste() {
    return this.registrationForm.controls.sediste;
  }
  get jmbg() {
    return this.registrationForm.controls.jmbg;
  }
  get password() {
    return this.registrationForm.controls.password;
  }
  get postanskiBroj() {
    return this.registrationForm.controls.postanskiBroj;
  }
}

export function sexValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return ['MALE', 'FEMALE'].some((e) => e === control.value)
      ? null
      : { sex: { value: control.value } };
  };
}

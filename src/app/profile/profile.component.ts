import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { Company } from '../model/company';
import { Person } from '../model/person';
import { Procurement } from '../model/procurement';
import { CompanyService } from '../services/company.service';
import { JavneNabavkeService } from '../services/javne-nabavke.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  logout() {
    this.authService.deleteToken()
    this.router.navigate(['login']);
  }
  private _procurements: Procurement[] = [];
  public get procurements(): Procurement[] {
    return this._procurements
  }
  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router,
    private javneNabavkeService: JavneNabavkeService
  ) { }

  ngOnInit(): void {
    let principal = this.authService.getPrincipal();
    this.companyService.findOne(principal).subscribe({
      next: (c) => {
        this._company = c;
        this._confirmationText = `zelim da likvidiram kompaniju ${c.pib}`;
        this.liquidateConfirmation = new FormControl(
          '',
          validateText(this._confirmationText)
        );
      },
    });
    this.javneNabavkeService.getProcurementsById(principal).subscribe({
      next: (p) => {
        this._procurements = p
      }
    })
  }

  private _company: Company | null | undefined;
  public get company(): Company | null | undefined {
    return this._company;
  }

  get vlasnik(): Person | null | undefined {
    return this.company?.vlasnik;
  }

  private _confirmationText: string = '';
  public get confirmationText(): string {
    return this._confirmationText;
  }

  liquidateConfirmation = new FormControl(
    this._confirmationText,
    validateText(this._confirmationText)
  );

  private _liquidationMode: boolean = false;
  public get liquidationMode(): boolean {
    return this._liquidationMode;
  }

  enterLiquidationMode() {
    this._liquidationMode = true;
  }
  exitLiquidationMode() {
    this._liquidationMode = false;
  }

  liquidate() {
    if (!this.liquidationMode) {
      this.enterLiquidationMode();
      return;
    } else if (!this.liquidateConfirmation.errors) {
      try {
        this.companyService.liquidate().subscribe({
          next: () => {
            this.toastr.success('Likvidacija uspešna');
            this.authService.deleteToken();
            this.router.navigate(['login']);
          },
          error: () => {
            this.toastr.error('Error liquidating company');
          },
        });
      } catch {
        this.toastr.error('Error liquidating company');
      }
    }
  }
}
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

function validateText(text: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === text
      ? null
      : { confirmationText: { value: control.value } };
  };
}

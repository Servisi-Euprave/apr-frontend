import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Company } from '../model/company';
import { Person } from '../model/person';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    let principal = this.authService.getPrincipal();
    this.companyService.findOne(principal).subscribe({
      next: (c) => (this._company = c),
    });
  }

  private _company: Company | null | undefined;
  public get company(): Company | null | undefined {
    return this._company;
  }

  get vlasnik(): Person | null | undefined {
    return this.company?.vlasnik;
  }
}

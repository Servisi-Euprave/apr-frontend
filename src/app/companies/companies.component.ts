import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Company, Delatnost } from '../model/company';
import {
  CompanyOrderCol,
  CompanyParams,
  CompanyService,
} from '../services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  private _companies: Company[] = [];
  public get companies(): Company[] {
    return this._companies;
  }
  private _page: number = 0;
  public get page(): number {
    return this._page;
  }
  constructor(private companyService: CompanyService) {}

  filterOrderForm = new FormGroup({
    asc: new FormControl<boolean | null>(null),
    order: new FormControl<CompanyOrderCol | null>(null),
    sediste: new FormControl(''),
    delatnost: new FormControl<Delatnost | null>(null),
    mesto: new FormControl(''),
  });

  private _colKeys: CompanyOrderCol[] = Object.values(CompanyOrderCol);
  public get colKeys(): CompanyOrderCol[] {
    return this._colKeys;
  }

  private _delatnostiKeys: Delatnost[] = Object.values(Delatnost);
  public get delatnostiKeys(): Delatnost[] {
    return this._delatnostiKeys;
  }

  ngOnInit() {
    this._loading = true;
    this.refreshPage();
  }

  onSubmit() {
    this._page = 0;
    this.refreshPage();
  }

  resetFilters() {
    this.filterOrderForm.reset();
  }

  private _loading = false;
  public get loading() {
    return this._loading;
  }

  refreshPage() {
    this._loading = true;
    let params: CompanyParams = {
      page: this._page,
      order: this.filterOrderForm.controls.order.value,
      asc: this.filterOrderForm.controls.asc.value,
      delatnost: this.filterOrderForm.controls.delatnost.value,
      sediste: this.filterOrderForm.controls.sediste.value,
      mesto: this.filterOrderForm.controls.mesto.value,
    };

    this.companyService.getCompanies(params).subscribe((c) => {
      this._companies = c;
      this._loading = false;
    });
  }

  pageBack() {
    if (this._page > 0) {
      this._page--;
    }
    this.refreshPage();
  }

  pageNext() {
    console.log('here');
    this._page++;
    this.refreshPage();
  }

  pageFirst() {
    this._page = 0;
    this.refreshPage();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company, Delatnost, NSTJ } from '../model/company';
import { JWTResponse } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  findOne(principal: string): Observable<Company> {
    let url = new URL(environment.aprApiURL);
    url.pathname = `api/company/${principal}`;
    return this.http.get<Company>(url.toString());
  }
  constructor(private http: HttpClient) {}

  register(company: Company) {
    let url = new URL(environment.aprApiURL);
    url.pathname = 'api/company/';
    return this.http
      .post<JWTResponse>(url.toString(), company)
      .pipe(map((jwtResponse) => jwtResponse.jwt));
  }

  getCompanies(params: CompanyParams): Observable<Company[]> {
    let url = new URL(environment.aprApiURL);
    url.pathname = 'api/company/';

    url.searchParams.set('page', params.page.toString());
    if (params.order) {
      url.searchParams.set('order', params.order);
    }
    if (params.asc) {
      url.searchParams.set('asc', params.asc.toString());
    }
    if (params.delatnost) {
      url.searchParams.set('delatnost', params.delatnost);
    }
    if (params.mesto) {
      url.searchParams.set('mesto', params.mesto);
    }
    if (params.sediste) {
      url.searchParams.set('sediste', params.sediste);
    }
    return this.http.get<Company[]>(url.toString());
  }

  findAllNstj(): Observable<NSTJ[]> {
    let url = new URL(environment.aprApiURL);
    url.pathname = 'api/nstj/';
    return this.http.get<NSTJ[]>(url.toString());
  }
}

export interface CompanyParams {
  page: number;
  order: CompanyOrderCol | null;
  asc: boolean | null;
  delatnost: Delatnost | null;
  sediste: string | null;
  mesto: string | null;
}

export enum CompanyOrderCol {
  naziv = 'naziv',
  vlasnik = 'vlasnik',
  pib = 'PIB',
  mesto = 'mesto',
}

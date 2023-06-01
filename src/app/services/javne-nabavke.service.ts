import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Procurement } from '../model/procurement';

@Injectable({
  providedIn: 'root'
})
export class JavneNabavkeService {
  readonly baseUrl = new URL(environment.javneNabavkeApiURL);
  constructor(private http: HttpClient) { }

  getProcurementsById(id: string): Observable<Procurement[]> {
    let url = new URL(this.baseUrl);
    url.pathname = 'api/getCompanyProcurements/';
    url.pathname += id.toString()
    return this.http.get<Procurement[]>(url.toString()).pipe(
      tap(ps => ps.forEach(p => {
        p.start_date = new Date(p.start_date);
        p.end_date = new Date(p.end_date)
      }))
    )
  }
}

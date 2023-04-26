import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../model/credentials';
import { map } from 'rxjs/operators';

export interface JWTResponse {
  jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<string> {
    let url = new URL(environment.aprApiURL);
    url.pathname = 'api/auth/login';
    return this.http
      .post<JWTResponse>(url.toString(), credentials)
      .pipe(map((jr) => jr.jwt));
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../model/credentials';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export interface JWTResponse {
  jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  ssoLogin(serviceId: string | null): Observable<string> {
    if (!this.authServ.isJwtValid()) {
      throw new Error('Invalid token');
    }
    let url = new URL(environment.aprApiURL);
    url.pathname = 'api/auth/login/' + serviceId;
    return this.http
      .get<JWTResponse>(url.toString(), {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authServ.getToken()!!}`,
        }),
      })
      .pipe(map((jr) => jr.jwt));
  }

  constructor(private http: HttpClient, private authServ: AuthService) {}

  login(credentials: Credentials): Observable<string> {
    let url = new URL(environment.aprApiURL);
    url.pathname = 'api/auth/login';
    return this.http
      .post<JWTResponse>(url.toString(), credentials)
      .pipe(map((jr) => jr.jwt));
  }
}

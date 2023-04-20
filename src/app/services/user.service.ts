import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { JWTResponse } from './auth-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<string> {
    let url = new URL(environment.aprApiURL);
    url.pathname = 'api/user/';
    console.log(`posting to ${url.toString()}`);
    return this.http
      .post<JWTResponse>(url.toString(), user)
      .pipe(map((jr) => jr.jwt));
  }
}

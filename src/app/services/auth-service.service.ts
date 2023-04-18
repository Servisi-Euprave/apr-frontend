import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../model/credentials';
import { catchError, map } from 'rxjs/operators';

export interface JWTResponse {
  jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<string> {
    let url = new URL(environment.aprApiURL);
    url.pathname = 'api/auth/login';
    console.log(`posting to ${url.toString()}`);
    return this.http.post<JWTResponse>(url.toString(), credentials).pipe(
      catchError(this.handleError),
      map((jr) => jr.jwt)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}

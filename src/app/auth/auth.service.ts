import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    return localStorage.getItem('jwt') !== null;
  }

  getPrincipal(): string {
    let token = this.parseToken();
    if (token) {
      return token.sub;
    }
    return '';
  }

  isJwtValid(): boolean {
    let claims = this.parseToken();
    let now = new Date();
    if (claims) {
      return (
        claims.exp.getTime() > now.getTime() &&
        claims.aud.some((aud) => aud === 'apr') &&
        claims.iat.getTime() < now.getTime() &&
        claims.iss === 'apr'
      );
    }
    return false;
  }

  private parseToken(): RegisteredClaims | null {
    let jwt = localStorage.getItem('jwt');
    try {
      if (jwt !== null) {
        let jwtData = jwt.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        let claims: RegisteredClaims = {
          iss: decodedJwtData.iss,
          sub: decodedJwtData.sub,
          aud: decodedJwtData.aud,
          exp: new Date(decodedJwtData.exp * 1_000),
          iat: new Date(decodedJwtData.iat * 1_000),
        };
        return claims;
      }
    } catch (error) {
      return null;
    }
    return null;
  }
}

interface RegisteredClaims {
  iss: string;
  sub: string;
  aud: string[];
  exp: Date;
  iat: Date;
}

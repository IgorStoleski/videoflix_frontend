import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);
  baseUrl = 'http://10.10.0.102:8000';

  constructor() { }

  signup(data: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(`${this.baseUrl}/login/`, data, { headers })
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
      }));
  }

  logout() {
    this.httpClient.post(`${this.baseUrl}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.getToken()}`
        },
      }
    );
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  getToken() {
    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    return authUser.token;
  }
}

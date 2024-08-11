import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);
  /* baseUrl = 'http://10.10.0.102:8000'; */
  baseUrl = 'https://backend.video-flix.de';

  private successMessageSubject = new BehaviorSubject<string>('');
  successMessage$ = this.successMessageSubject.asObservable();

  private errorMessageSubject = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  activateAccount(uid: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/activate/${uid}/${token}`);
  }

  signup(data: any) {
    this.httpClient.post(`${this.baseUrl}/register/`, data).subscribe(
      response => {
        this.successMessageSubject.next('An email has been sent to you for verification. Please verify your email to login.');
        setTimeout(() => {
          this.router.navigate(['/login']); 
        }, 4000);  
        console.log("Registration successful", response);
      },
      error => {
        this.errorMessageSubject.next('An error occurred. Please try again.');
        console.error("Registration failed", error);
      }
    );

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

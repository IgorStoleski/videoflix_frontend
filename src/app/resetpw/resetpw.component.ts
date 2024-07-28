import { Component, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/module/material/material.module';

@Component({
  selector: 'app-resetpw',
  standalone: true,
  imports: [
    FormsModule,
    MaterialModule
  ],
  templateUrl: './resetpw.component.html',
  styleUrl: './resetpw.component.scss'
})
export class ResetpwComponent {
  private apiUrl = 'http://10.10.0.102:8000/request-password-reset/';
  email: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private http: HttpClient) {}

  requestPasswordReset() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email: this.email });

    this.http.post(this.apiUrl, body, { headers: headers })
    .subscribe(
      (response: any) => {
        this.messageType = 'success';
        this.message = response.message;
      },
      (error: any) => {
        this.messageType = 'error';
        this.message = error.error.error;
      }
    );
  }
}

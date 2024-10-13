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
  private apiUrl = 'https://backend.video-flix.de/request-password-reset/';
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
        if (response.message) {
          setTimeout(() => {
            window.close();
          }, 3000); 
        }
      },
      (error: any) => {
        this.messageType = 'error';
        this.message = error.error.error;
      }
    );
  }
}

import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/module/material/material.module';

@Component({
  selector: 'app-confirmpw',
  standalone: true,
  imports: [
    FormsModule,
    MaterialModule
  ],
  templateUrl: './confirmpw.component.html',
  styleUrl: './confirmpw.component.scss'
})
export class ConfirmpwComponent {
  private apiUrl = 'http://10.10.0.102:8000/password-reset-confirm/';
  uid: string;
  token: string;
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'success';


  hideNewPassword = signal(true);
  hideConfirmPassword = signal(true);

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.uid = this.route.snapshot.params['uid'];
    this.token = this.route.snapshot.params['token'];
  }

  toggleVisibility(field: 'new' | 'confirm') {
    if (field === 'new') {
      this.hideNewPassword.set(!this.hideNewPassword());
    } else if (field === 'confirm') {
      this.hideConfirmPassword.set(!this.hideConfirmPassword());
    }
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.messageType = 'error';
      this.message = 'Passwords do not match';
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ new_password: this.newPassword });

    this.http.post(`${this.apiUrl}${this.uid}/${this.token}/`, body, { headers: headers })
      .subscribe(
        (response: any) => {
          this.messageType = 'success';
          this.message = 'Password has been reset successfully';
          setTimeout(() => this.router.navigate(['/login']), 3000);  // Weiterleitung zum Login nach 3 Sekunden
        },
        (error: any) => {
          this.messageType = 'error';
          this.message = error.error.error || 'Error resetting password';
        }
      );
  }
}

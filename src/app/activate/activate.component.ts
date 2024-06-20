import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent implements OnInit{
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid');
    const token = this.route.snapshot.paramMap.get('token');
  
    if (!uid || !token) {
      this.message = 'Invalid activation details.';
      return;
    }
  
    this.authService.activateAccount(uid, token).subscribe({
      next: (response) => {
        this.message = 'Account activated successfully. Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (error) => {
        this.message = 'Activation link is invalid or expired.';
      }
    });
  }

}

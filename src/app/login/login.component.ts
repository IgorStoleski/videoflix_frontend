import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/module/material/material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}

import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/module/material/material.module';
import { VideoflixAnimationComponent } from './videoflix-animation/videoflix-animation.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MaterialModule,
    LoginComponent,
    VideoflixAnimationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'videoflix';

  
  
}

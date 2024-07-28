import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routes } from './app.routes';
import { MaterialModule } from './shared/module/material/material.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoPlayerComponent } from './videoplayer/videoplayer.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    MaterialModule, provideAnimationsAsync(),
    BrowserAnimationsModule,
    provideHttpClient(),
    NgbModule,
    VideoPlayerComponent,
  ]
};

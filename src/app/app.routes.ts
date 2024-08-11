import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VideoflixAnimationComponent } from './videoflix-animation/videoflix-animation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { ActivateComponent } from './activate/activate.component';
import { HomeComponent } from './home/home.component';
import { DokuComponent } from './doku/doku.component';
import { SportComponent } from './sport/sport.component';
import { KidsComponent } from './kids/kids.component';
import { LegalnoticeComponent } from './legalnotice/legalnotice.component';
import { ImprintComponent } from './imprint/imprint.component';
import { ResetpwComponent } from './resetpw/resetpw.component';
import { ConfirmpwComponent } from './confirmpw/confirmpw.component';

export const routes: Routes = [
    { path: '', component: VideoflixAnimationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'legalnotice', component: LegalnoticeComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'request-password-reset', component: ResetpwComponent },
    { path: 'password-reset-confirm/:uid/:token', component: ConfirmpwComponent },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'doku', component: DokuComponent },
            { path: 'sport', component: SportComponent },
            { path: 'kids', component: KidsComponent },
        ]
    },
    { path: 'activate/:uid/:token', component: ActivateComponent }
];

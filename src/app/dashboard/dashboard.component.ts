import { AuthService } from './../auth/auth.service';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../shared/module/material/material.module';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { KidsComponent } from '../kids/kids.component';
import { SportComponent } from '../sport/sport.component';
import { DokuComponent } from '../doku/doku.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgbCollapseModule, 
    RouterLink,
    MaterialModule,
    KidsComponent,
    SportComponent,
    DokuComponent,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  authService = inject(AuthService);
  router = inject(Router);
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;
  isMenuCollapsed = true;


  constructor(private observer: BreakpointObserver) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

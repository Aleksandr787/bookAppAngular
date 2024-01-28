import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'cm-main-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    NavigationComponent,
    MatButtonModule
  ],
  template: `
    <div class="container">

    <cm-navigation *ngIf="authService.isAutorized"></cm-navigation>
    <!-- <cm-navigation ></cm-navigation> -->

    <main class="main">
      <!-- <a *ngIf="!authService.isAutorized" mat-raised-button color="primary" (click)="login()"> Login  </a> -->
      <p> Welcome {{authService.user}}</p>
      <router-outlet></router-outlet>
    </main>

    </div>
  `,
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  constructor(
    public authService : AuthService
  ) {
  }
  
  public logout() : void {
    this.authService.logout();
  }

}

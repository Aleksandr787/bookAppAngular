import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { BookCardComponent } from '../../book-card/book-card.component';

@Component({
  selector: 'cm-main-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatButtonModule
  ],
  template: `
  <p>MAIN WORK!!!</p>
    <!-- <main class="main">
      <a *ngIf="!authService.isAutorized" mat-raised-button color="primary" (click)="login()"> Login  </a>
      <p> Welcome {{authService.user}}</p>
    </main> -->
  `,
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  // constructor(
  //   public authService: AuthService,
  // ) {
  // }

  // public logout(): void {
  //   this.authService.logout();
  // }

}

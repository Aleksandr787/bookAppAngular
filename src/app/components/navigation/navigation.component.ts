import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { INavigationItem } from '../../interfaces/INavigationItem';
import { AuthService } from '../../services/auth/auth.service';
import { MainPageComponent } from '../main-page/main-page/main-page.component';

@Component({
  selector: 'cm-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
  ],
  template: `
    <div class="navigation">

      <div class="navigation__category">
        <span class="navigation__category__name">Books</span>
        
        <mat-nav-list>
          <a mat-list-item routerLink="main" routerLink="main" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">home</mat-icon>
              <span>Main Page</span>
            </div>
          </a>
          <a mat-list-item routerLink="books" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">book_2</mat-icon>
              <span>My books</span>
            </div>
          </a>
          <a mat-list-item>
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">post_add</mat-icon>
              <span>Add book</span>
            </div>
          </a>
          <a mat-list-item (click)="mainPage.logout()">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">logout</mat-icon>
              <span>Logout</span>
            </div>
          </a>
        </mat-nav-list>
      </div>

      <!-- <div class="line"></div> -->
    </div>
  `,
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  constructor(
    public mainPage : MainPageComponent
  ){
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { INavigationItem } from '../../interfaces/INavigationItem';
import { AuthService } from '../../services/auth/auth.service';
import { MainPageComponent } from '../main-page/main-page/main-page.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { MatDialog } from '@angular/material/dialog';
import { AddBookImageComponent } from '../dialogs/add-book-image/add-book-image.component';
import { IAddBookImage } from '../../interfaces/book';
import { BookImageService } from '../../services/book-image/book-image.service';
import { BookService } from '../../services/book/book.service';
import { BookListCardComponent } from '../book-list-card/book-list-card.component';

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
              <span>Home</span>
            </div>
          </a>
          <a mat-list-item routerLink="books" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">book_2</mat-icon>
              <span>My books</span>
            </div>
          </a>
          <a mat-list-item (click)="addBookDialog()">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">post_add</mat-icon>
              <span>Add book</span>
            </div>
          </a>
          <a mat-list-item (click)="logout();">
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
    private _authService: AuthService,
    private _bookImageService: BookImageService,
  ) {
  }

  public addBookDialog(): void {
    this._bookImageService.addBookDialog();
  }

  public logout(): void {
    this._authService.logout();
  }
}

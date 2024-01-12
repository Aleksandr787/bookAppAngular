import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BookService } from './services/book.service';
import { IBook } from './interfaces/book';
import { AuthService } from './auth/auth.service';

interface INavigationItem {
  id: string,
  label: string,
  icon: string
}

@Component({
  selector: 'cm-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'lection-angular';

  public books: IBook[] = [];

  constructor(
    public authService: AuthService,
    private bookService: BookService
  ) {    
  }

  public ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.bookService.getAll().subscribe(bookFromService => {
      this.books = bookFromService;
    });
  }

  public logout(): void {
    this.authService.logout();
  }

  public navLinks: INavigationItem[] = [
    {
      id: 'first',
      label: 'First Element',
      icon: 'home'
    },
    {
      id: 'second',
      label: 'Second Element',
      icon: 'home'
    },
    {
      id: 'third',
      label: 'Third Element',
      icon: 'home'
    }
  ];
  public activeLinkId: string = 'first';
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BookService } from './services/book.service';
import { IBook } from './interfaces/book';

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
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'lection-angular';

  public books: IBook[] = [];

  constructor(
    private bookService: BookService
  ) {    
  }

  public ngOnInit(): void {
    this.loadBooks();
  }

  public addBook(): void {
    this.bookService.addBook().subscribe(() => {
      this.loadBooks();
    });
  }

  private loadBooks(): void {
    this.bookService.getAll().subscribe(bookFromService => {
      this.books = bookFromService;
    });
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

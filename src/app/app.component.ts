import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BookService } from './services/book.service';
import { IBook } from './interfaces/book';
import { MatRippleModule } from '@angular/material/core';
import { BookListCardComponent } from './book-list-card/book-list-card.component';

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
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    BookListCardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
// [x: string]: any;
  title = 'lection-angular';

  public books: IBook[] = [];

  public activeBookId: number = 0;

  constructor(
    private bookService: BookService
  ) {

  }

  public ngOnInit(): void {
    this.loadBook();
  }

  public addBook() : void {
    this.bookService.addBook().subscribe(() => {
      this.loadBook();
    })
  }

  public loadBook() : void {
    console.log("loadBook");
    this.bookService.getAll().subscribe(books => {
      this.books = books;
    });
  }

  public navLinks: INavigationItem[] = [
    {
      id: '1',
      label: 'All books',
      icon: 'book_2'
    },
    {
      id: '2',
      label: 'Outbox',
      icon: 'send'
    },
    {
      id: '3',
      label: 'Favorites',
      icon: 'Favorite'
    },
    {
      id: '4',
      label: 'Trash',
      icon: 'delete'
    }
  ];

  public navLinksLabels: INavigationItem[] = [
    {
      id: '5',
      label: 'Label',
      icon: 'Fiber_manual_record'
    },
    {
      id: '6',
      label: 'Label',
      icon: 'change_history'
    },
    {
      id: '7',
      label: 'Label',
      icon: 'stop'
    },
    {
      id: '8',
      label: 'Label',
      icon: 'stop'
    }
  ];

  public activeLinkId: string = 'first';
}

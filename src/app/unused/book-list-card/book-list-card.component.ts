import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { BookService } from '../book/book.service';
import { IAddBook, IBook, IEditBook } from '../../interfaces/book';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cm-book-list-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatRippleModule
  ],
  template: `


    <div class="book-list">
      @for (book of books; track book) {
        <div class="book" matRipple (click)="editBook(book)">
          <mat-icon class="book__icon material-symbols-outlined">book_2</mat-icon>
          <div class="book__content">
            <span class="book__content__name">{{book.name}}</span>
            <span class="book__content__author">{{book.author.firstname}} {{book.author.lastname}}</span>
          </div>
        </div>
      }
    </div>

    <!-- <div class="book-list">
      @for (book of books; track book) {
      <mat-card mat-card-hover>
        <div class="testt">
          <mat-card-content matRipple mat-card-hover (click)="editBook(book)">
            <mat-card-title>{{book.name}}</mat-card-title>
            <mat-card-subtitle>{{book.author.firstname}} {{book.author.lastname}}</mat-card-subtitle>
          </mat-card-content>
        </div>

      </mat-card>
      }
    </div> -->
  `,
  styleUrl: './book-list-card.component.scss'
})
export class BookListCardComponent implements OnInit {

  public books: IBook[] = [];

  //public activeBookId: number = 0; //???

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.loadBook();
  }

  public loadBook(): void {
    console.log("loadBook");
    this.bookService.getAll().subscribe(books => {
      this.books = books;
    });
  }

  public editBook(book: IEditBook): void {
    const dialogRef = this.dialog.open(AddBookComponent, {data: book});

    dialogRef.afterClosed().subscribe((result : IEditBook ) => {
      if(!result) return;
      this.bookService.editBook(result);
    });
  }

  public addBook(): void {
    const dialogRef = this.dialog.open(AddBookComponent);

    dialogRef.afterClosed().subscribe((result : IAddBook ) => {
      if(!result) return;
      this.bookService.addBook(result);
    });
  }
  // public addBook(): void {
  //   this.bookService.addBook().subscribe(() => {
  //     this.loadBook();
  //   })
  // }
}

export function hexToRgb(hex: string): string {
  const matches = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!matches) {
    throw new Error("Invalid hex color");
  }

  const [, r, g, b] = matches;
  return `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`;
}

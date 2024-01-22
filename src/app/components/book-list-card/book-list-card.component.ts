import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { BookService } from '../../services/book/book.service';
import { IAddBook, IBook, IEditBook } from '../../interfaces/book';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../dialogs/add-book/add-book/add-book.component';

@Component({
  selector: 'cm-book-list-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatRippleModule
  ],
  template: `
    <div class="book-list">
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
    </div>
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

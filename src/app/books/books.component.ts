import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { IAddBook, IBook, IEditBook } from '../interfaces/book';
import { BookPipe } from "../pipes/book.pipe";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from './dialogs/add-book/add-book.component';

@Component({
  selector: 'cm-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  imports: [
    MatButtonModule,
    BookPipe
  ]
})
export class BooksComponent implements OnInit {

  public books: IBook[] = [];

  constructor(
    private bookService: BookService,
    private dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.loadBooks();
  }

  public addBook(): void {
    const dialogRef = this.dialog.open(AddBookComponent);
    dialogRef.afterClosed().subscribe((result: IAddBook) => {
      if (result) {
        this.bookService.addBook(result);
      }
    });
  }

  public editBook(book: IBook): void {
    const dialogRef = this.dialog.open(AddBookComponent, { data: book });
    dialogRef.afterClosed().subscribe((result: IEditBook) => {
      if (result) {
        this.bookService.editBook(result);
      }
    });
  }

  private loadBooks(): void {
    this.bookService.getAll().subscribe(bookFromService => {
      this.books = bookFromService;
    });
  }
}

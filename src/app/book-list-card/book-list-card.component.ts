import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { BookService } from '../services/book.service';
import { IBook } from '../interfaces/book';

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
          <mat-card-content matRipple mat-card-hover>
            <mat-card-title>{{book.name}}</mat-card-title>
            <mat-card-subtitle>{{book.author}}</mat-card-subtitle>
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

  public activeBookId: number = 0; //???

  constructor(
    private bookService: BookService
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

  public addBook(): void {
    this.bookService.addBook().subscribe(() => {
      this.loadBook();
    })
  }
}

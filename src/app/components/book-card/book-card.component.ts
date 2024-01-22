import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { IAddBookCard, IBookCard, IEditBookCard } from '../../interfaces/book';
import { BookImageService } from '../../services/book-image/book-image.service';
import { AuthorPipe } from "../../pipes/author/author.pipe";
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddBookComponent } from '../dialogs/add-book/add-book.component';
import { MatButtonModule } from '@angular/material/button'
@Component({
    selector: 'cm-book-card',
    standalone: true,
    template: `
    <!-- <a mat-raised-button color="primary" (click)="addBook()"> Add BOOOOOOOOOOK </a> -->
    <div class="container">

      @for (book of books; track book) {
        <div matRipple class="card" (click)="editBook(book)">
        <img src={{book.image}} alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">{{book.name}}</span>
          <span class="card__info__author">{{book | author}}</span>
        </div>
      </div>  
      }

    </div>
  `,
    styleUrl: './book-card.component.scss',
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatRippleModule,
        MatDialogModule,
        AuthorPipe
    ]
})
export class BookCardComponent {

  public books: IBookCard[] = [];

  //public activeBookId: number = 0; //???

  constructor(
    private bookImageService: BookImageService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.loadBook();
  }

  public loadBook(): void {
    console.log("loadBook");
    this.bookImageService.getAll().subscribe(books => {
      this.books = books;
    });
  }

  public editBook(book: IEditBookCard): void {
    const dialogRef = this.dialog.open(AddBookComponent, {data: book});

    dialogRef.afterClosed().subscribe((result : IEditBookCard ) => {
      if(!result) return;
      this.bookImageService.editBook(result);
    });
  }

  // public addBook(): void {
  //   const dialogRef = this.dialog.open(AddBookComponent);

  //   dialogRef.afterClosed().subscribe((result : IAddBookCard ) => {
  //     if(!result) return;
  //     this.bookImageService.addBook(result);
  //   });
  // }
}

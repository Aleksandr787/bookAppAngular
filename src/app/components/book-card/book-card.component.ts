import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { IAddBookImage, IBookImage, IEditBookImage } from '../../interfaces/book';
import { BookImageService } from '../../services/book-image/book-image.service';
import { AuthorPipe } from "../../pipes/author/author.pipe";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddBookImageComponent } from '../dialogs/add-book-image/add-book-image.component';
import { MatButtonModule } from '@angular/material/button'
@Component({
  selector: 'cm-book-card',
  standalone: true,
  template: `
    <!-- <a mat-raised-button color="primary" (click)="addBook()"> Add BOOOOOOOOOOK </a> -->
    <div class="container">

      @for (book of books; track book) {
        <div matRipple class="card" (click)="editBook(book)">
          <img src={{book.imageUrl}} alt="" class="card__image">
          <div class="card__info">
            <span class="card__info__name">{{book.name}}</span>
            <span class="card__info__author">{{book.author}}</span>
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

  public books: IBookImage[] = [];

  //public activeBookId: number = 0; //???

  constructor(
    private bookImageService: BookImageService,
    private dialog: MatDialog,
  ) {

  }

  // public ngOnInit(): void {
  //   this.loadBook();
  // }

  public ngOnInit(): void {
    this.loadBook();

    // let element = document.querySelector('.card__info__name');
    // if(element == null){
    //   return;
    // }
    
    // let elementNotNull : Element = element;

    // let scrollHeight = element.scrollHeight;

    // window.setInterval(function () {
    //   if (elementNotNull.scrollTop === scrollHeight) {
    //     elementNotNull.scrollTop = 0;
    //   } else {
    //     elementNotNull.scrollTop += 2;
    //   }
    // }, 500); // Прокрутка на 10 пикселей каждую 100 миллисекунд
  }

  // НАПИСАТЬ АЛГОРИТМ ДЛЯ изменения book.name
  // public loadBook(): void {
  //   console.log("loadBook");
  //   this.bookImageService.getAll().subscribe(books => {
  //     this.books = books.map(book => {
  //       let name = book.name;
  //       if (name.length > 16) {
  //         let parts = Array.from(name.match(new RegExp('.{1,16}', 'g')));
  //         parts = parts.map((part, index) => part + (index % 16 === 15 ? ' - ' : ''));
  //         name = parts.join('');
  //       }
  //       return { ...book, name };
  //     });
  //   });
  // }

  public loadBook(): void {
    console.log("loadBook");
    this.bookImageService.getAll().subscribe(books => {
      this.books = books;
    });
  }

  public editBook(book: IEditBookImage): void {
    const dialogRef = this.dialog.open(AddBookImageComponent, { data: book });

    dialogRef.afterClosed().subscribe((result: IEditBookImage) => {
      if (!result) return;
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

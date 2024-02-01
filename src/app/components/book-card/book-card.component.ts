import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { IAddBookImage, IBookImage, IEditBookImage } from '../../interfaces/book';
import { BookImageService } from '../../services/book-image/book-image.service';
import { AuthorPipe } from "../../pipes/author/author.pipe";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddBookImageComponent } from '../dialogs/add-book-image/add-book-image.component';
import { MatButtonModule, MatIconButton } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { DeleteBooksComponent } from '../dialogs/delete-books/delete-books/delete-books.component';
@Component({
  selector: 'cm-book-card',
  standalone: true,
  template: `
    <!-- <a mat-raised-button color="primary" (click)="addBook()"> Add BOOOOOOOOOOK </a> -->
    <div class="container-main">
      <div class="header-wrapper">
        <div class="header">
          <div class="header__search">
            <button mat-icon-button disabled="true">
                <mat-icon class="header__search__icon">search</mat-icon>
            </button>
            <input (keyup)="filterResults(filter.value)" type="text" placeholder="Filter by name" #filter>
            <button mat-icon-button>
                <mat-icon class="header__search__icon">mic</mat-icon>
            </button>
          </div>
          <button mat-fab color="warn" (click)="deleteAll()" aria-label="Example icon button with a delete icon">
              <mat-icon class="material-symbols-outlined">delete</mat-icon>
          </button>
          
          <!-- <button mat-flat-button (click)="deleteAll()">Delete All</button> -->
        </div>
      </div>




      <div class="container-cards">

        @for (book of booksFilteredList; track book) {
          
          <div matRipple class="card" (click)="editBook(book)">
            <img src={{book.imageUrl}} alt="" class="card__image">
            <div class="card__info">
              <span class="card__info__name">{{book.name}}</span>
              <span class="card__info__author">{{book.author}}</span>
            </div>
          </div>  
        
        }

      </div>

    </div>

  `,
  styleUrl: './book-card.component.scss',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatIconModule,
    AuthorPipe
  ]
})
export class BookCardComponent {

  public books: IBookImage[] = [];
  public booksFilteredList: IBookImage[] = [];
  public filterValue: string = '';

  constructor(
    private bookImageService: BookImageService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.loadBook();

    this.bookImageService.myEventEmitter.subscribe(() => {
      this.loadBook();
    })
  }

  public loadBook(): void {
    console.log("loadBook");
    this.bookImageService.getAll().subscribe(books => {
      this.books = books;
      this.filterResults(this.filterValue);
    });
  }

  filterResults(text: string) {
    this.filterValue = text;

    if (!text) {
      this.booksFilteredList = this.books;
      return;
    }

    this.booksFilteredList = this.books.filter(
      book => book?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  // public generateBooks(): void {
  //   this.bookImageService.generate().subscribe(() => {
  //     this.loadBook();
  //   });
  // }

  // public addBookDialog(): void {
  //   const dialogRef = this.dialog.open(AddBookImageComponent);

  //   dialogRef.afterClosed().subscribe((result: IAddBookImage) => {
  //     if (!result) return;
  //     this.bookImageService.addBook(result).subscribe(() => {
  //       this.loadBook();
  //     });
  //   });
  // }

  // public deleteAll(): void {
  //   this.bookImageService.deleteAll().subscribe(() => {
  //     this.loadBook();
  //   });
  // }

  public deleteAll(): void {
    const dialogRef = this.dialog.open(DeleteBooksComponent);
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.bookImageService.deleteAll().subscribe(()=>{
          this.loadBook();
        });
      }
    });
  }

  public editBook(book: IEditBookImage): void {
    const dialogRef = this.dialog.open(AddBookImageComponent, { data: book });

    dialogRef.afterClosed().subscribe((result: IEditBookImage | string) => {
      if (!result) return;

      if (typeof result === 'string') {
        this.bookImageService.deleteBook(result).subscribe(() => {
          this.loadBook();
        });
      }
      else {
        this.bookImageService.editBook(result).subscribe(() => {
          this.loadBook();
        });
      }

    });
  }
}

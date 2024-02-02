import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookImageService } from '../../../services/book-image/book-image.service';
import { IBookImage, IEditBookImage } from '../../../interfaces/book';
import { CommonModule } from '@angular/common';
import { AddBookImageComponent } from '../../dialogs/add-book-image/add-book-image.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthorPipe } from '../../../pipes/author/author.pipe';
import { DeleteBooksComponent } from '../../dialogs/delete-books/delete-books/delete-books.component';

@Component({
  selector: 'cm-book-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatIconModule,
    AuthorPipe,
    RouterModule
  ],
  template: `
      <div class="card">
        <div class="card__left">
          <img class="card__left__image" src={{book.imageUrl}} alt="">
          <div class="card__left__buttons">
            <button mat-flat-button (click)="onDelete()">Delete</button>
            <button mat-flat-button (click)="editBook(book)">Edit</button>
          </div>
        </div>
        <div class="card__right">
          <div class="card__right__info">
            <span class="card__right__info__name">{{book.name}}</span>
            <span class="card__right__info__author">{{book.author}}</span>
            <span class="card__right__info__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Corporis delectus nesciunt voluptatum neque doloremque! 
              Ea voluptatum quisquam obcaecati, repudiandae dolore quae 
              impedit ipsam quam voluptate itaque tempora ut ipsum architecto.
            </span>

          </div>
        </div>
      </div>

  `,
  styleUrl: './book-info.component.scss'
})
export class BookInfoComponent {
  // Кнопка ПОД image buttons delete -> dialog, edit -> dialog
  private route: ActivatedRoute = inject(ActivatedRoute);
  private _bookId: string = '';
  public book: IBookImage = {
    id: '',
    name: '',
    author: '',
    imageUrl: ''
  };

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _bookImageService: BookImageService
  ) {

    this._bookId = this.route.snapshot.params['id'];
    this.updateBook(this._bookId);
  }

  private updateBook(id: string): void {
    this._bookImageService.getBook(id).subscribe((book) => {
      this.book = book;
    });
  }

  public onDelete(): void {
    const dialogRef = this._dialog.open(DeleteBooksComponent, {data: {all: false}});

    dialogRef.afterClosed().subscribe((result: {all: boolean}) => {
      if (result) {
        this._bookImageService.deleteBook(this._bookId).subscribe(() => {
          this._router.navigate(['/books']);
        });
      }
    });
  }

  public editBook(book: IEditBookImage | undefined): void {
    const dialogRef = this._dialog.open(AddBookImageComponent, { data: book });

    dialogRef.afterClosed().subscribe((result: IEditBookImage) => {
      if (!result) return;

      this._bookImageService.editBook(result).subscribe(() => {
        this.updateBook(this._bookId);
      });

    });
  }
}

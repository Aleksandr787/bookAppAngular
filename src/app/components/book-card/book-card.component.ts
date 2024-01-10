import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { IBookCard } from '../../interfaces/book';
import { BookImageService } from '../../services/book-image.service';

@Component({
  selector: 'cm-book-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatRippleModule
  ],
  template: `
    <div class="container">

      @for (book of books; track book) {
        <div matRipple class="card">
        <img src={{book.image}} alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">{{book.name}}</span>
          <span class="card__info__author">{{book.author}}</span>
        </div>
      </div>  
      }

    </div>
  `,
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {

  public books: IBookCard[] = [];

  public activeBookId: number = 0; //???

  constructor(
    private bookImageService: BookImageService
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

  public addBook(): void {
    this.bookImageService.addBook().subscribe(() => {
      this.loadBook();
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { IBook, IBookCard } from '../../interfaces/book';
import { BookService } from '../../services/book.service';

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
      <!-- @for (book of books; track book) {
        <div matRipple class="card">
        <img src={{book.ima}} alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>  
      } -->
      <div matRipple class="card">
        <img src="https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
      <div matRipple class="card">
        <img src="https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
      <div matRipple class="card">
        <img src="https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
      <div matRipple class="card">
        <img src="https://knigimarket.com/wp-content/uploads/2021/11/cover1__w6098708090-1.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
      <div class="card">
        <img src="https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
      <div class="card">
        <img src="https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
      <div class="card">
        <img src="https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
      <div class="card">
        <img src="https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
      <div class="card">
        <img src="https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
      <div class="card">
        <img src="https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
      <div class="card">
        <img src="https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
      <div class="card">
        <img src="https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg" alt="" class="card__image">
        <div class="card__info">
          <span class="card__info__name">Гарри Поттер и философский камень</span>
          <span class="card__info__author">Джоан Роулинг</span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {

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

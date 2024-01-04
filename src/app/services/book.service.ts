import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _books : IBook[] = [
    {
      id: 1,
      name: "Гарри Поттер и философский камень",
      author: "Джоан Роулинг"
    },
    {
      id: 2,
      name: "Война и мир",
      author: "Лев Толстой"
    },
    {
      id: 3,
      name: "Государь",
      author: "Никколо Макиавелли"
    },
    {
      id: 4,
      name: "Преступление и наказание",
      author: "Федор Достоевский"
    },
    {
      id: 5,
      name: "Унесенные ветром",
      author: "Маргарет Митчелл"
    },
    {
      id: 6,
      name: "1984",
      author: "Джордж Оруэлл"
    },
    {
      id: 7,
      name: "Мастер и Маргарита",
      author: "Михаил Булгаков"
    },
    {
      id: 8,
      name: "Улисс",
      author: "Джеймс Джойс"
    },
    {
      id: 9,
      name: "Три товарища",
      author: "Эрих Мария Ремарк"
    },
    {
      id: 10,
      name: "Граф Монте-Кристо",
      author: "Александр Дюма"
    }
];

  constructor() { }

  public getAll() : Observable<IBook[]> {
    return of(this._books);
  }
}

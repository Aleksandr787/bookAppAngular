import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/book';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _currentId: number = 1;

  private _books: IBook[] = [
    {
      id: this._currentId,
      name: 'Дюна',
      author: 'Френк Герберт'
    }
  ];

  constructor() { }

  public getAll(): Observable<IBook[]> {
    console.log('GetAll called');
    return of(this._books);
  }

  public addBook(): Observable<any> {
    console.log('AddBook called');
    this._currentId++;
    let book: IBook = {
      id: this._currentId,
      name: 'Инквизитор Эйзенхорн',
      author: 'Ден Аббнет'
    };
    this._books.push(book);
    return of();
  }
}

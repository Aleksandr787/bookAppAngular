import { Injectable } from '@angular/core';
import { IAddBook, IBook, IEditBook } from '../interfaces/book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _currentId: number = 1;

  private _books: IBook[] = [
    {
      id: this._currentId,
      name: 'Дюна',
      author: {
        firstName: 'Френк',
        lastName: 'Герберт'
      }
    }
  ];

  constructor() { }

  public getAll(): Observable<IBook[]> {
    console.log('GetAll called');
    return of(this._books);
  }

  public addBook(addBookRequest: IAddBook): Observable<any> {
    this._currentId++;
    let book: IBook = {
      id: this._currentId,
      name: addBookRequest.name,
      author: addBookRequest.author
    };
    this._books.push(book);
    return of();
  }

  public editBook(editBookRequest: IEditBook):  Observable<any> {
    const index = this._books.findIndex(book => book.id === editBookRequest.id);
    if(index === -1) return of();
    this._books[index] = editBookRequest;
    return of();
  }

}

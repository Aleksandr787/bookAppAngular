import { Injectable } from '@angular/core';
import { IAddBook, IBook, IEditBook } from '../interfaces/book';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _currentId: number = 1;

  private _books: IBook[] = [
    // {
    //   id: this._currentId,
    //   name: 'Дюна',
    //   author: {
    //     firstName: 'Френк',
    //     lastName: 'Герберт'
    //   }
    // }
  ];

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  public getAll(): Observable<IBook[]> {
    return this.httpClient.get<IBook[]>(environment.apiUrl + 'books');
  }

  public addBook(addBookRequest: IAddBook): Observable<any> {
    this._currentId++;
    // let book: IBook = {
    //   id: this._currentId,
    //   name: addBookRequest.name,
    //   author: addBookRequest.author
    // };
    // this._books.push(book);
    return of();
  }

  public editBook(editBookRequest: IEditBook):  Observable<any> {
    // const index = this._books.findIndex(book => book.id === editBookRequest.id);
    // if(index === -1) return of();
    // this._books[index] = editBookRequest;
    return of();
  }

}

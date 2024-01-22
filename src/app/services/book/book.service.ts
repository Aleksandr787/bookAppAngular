import { Injectable } from '@angular/core';
import { IAddBook, IBook, IEditBook } from '../../interfaces/book';
import { Observable, of } from 'rxjs';
import { AddBookComponent } from '../../components/dialogs/add-book/add-book/add-book.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _books: IBook[] = [
    {
      id: 1,
      name: "Гарри Поттер и философский камень",
      author: { firstname: "Джоан", lastname: "Роулинг" },
    },
    {
      id: 2,
      name: "Война и мир",
      author: { firstname: "Джоан", lastname: "Роулинг" },
    },
    {
      id: 3,
      name: "Государь",
      author: { firstname: "Джоан", lastname: "Роулинг" },
    },
    {
      id: 4,
      name: "Преступление и наказание",
      author: { firstname: "Джоан", lastname: "Роулинг" },
    },
    {
      id: 5,
      name: "Унесенные ветром",
      author: { firstname: "Джоан", lastname: "Роулинг" },
    },
    {
      id: 6,
      name: "1984",
      author: { firstname: "Джоан", lastname: "Роулинг" },
    },
    {
      id: 7,
      name: "Мастер и Маргарита",
      author: { firstname: "Джоан", lastname: "Роулинг" },
    },
    {
      id: 8,
      name: "Улисс",
      author: { firstname: "Джоан", lastname: "Роулинг" },
    },
    {
      id: 9,
      name: "Три товарища",
      author: { firstname: "Джоан", lastname: "Роулинг" },
    },
    {
      id: 10,
      name: "Граф Монте-Кристо",
      author: { firstname: "Джоан", lastname: "Роулинг" },
    }
  ];

  private _currentId: number = 10;
  constructor(
    private dialog: MatDialog,
  ) { }

  public getAll(): Observable<IBook[]> {
    return of(this._books);
  }

  public addBook(bookAdd: IAddBook): Observable<any> {
    console.log("addBook");
    this._currentId++;

    let book: IBook = {
      id: this._currentId,
      name: bookAdd.name,
      author: bookAdd.author,
    }
    this._books.push(book);
    return of();
  }

  public addBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookComponent);

    dialogRef.afterClosed().subscribe((result : IAddBook ) => {
      if(!result) return;
      this.addBook(result);
    });
  }

  public editBook(editBookRequest : IEditBook) : Observable<any> {
    const index = this._books.findIndex(book => book.id === editBookRequest.id);
    if(index === -1) return of();

    this._books[index] = editBookRequest;
    return of();
  }
}

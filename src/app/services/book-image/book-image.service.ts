import { Injectable } from '@angular/core';
import { IAddBookCard, IBookCard, IEditBookCard } from '../../interfaces/book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookImageService {

  private _books : IBookCard[] = [
    {
      id: 1,
      name: "Гарри Поттер и философский камень",
      author: { firstname: "Джоан", lastname: "Роулинг"},
      image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
    },
    {
      id: 2,
      name: "Гарри Поттер и философский камень",
      author: { firstname: "Джоан", lastname: "Роулинг"},
      image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
    },
    {
      id: 3,
      name: "Гарри Поттер и философский камень",
      author: { firstname: "Джоан", lastname: "Роулинг"},
      image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
    },
    {
      id: 4,
      name: "Гарри Поттер и философский камень",
      author: { firstname: "Джоан", lastname: "Роулинг"},
      image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
    },
    {
      id: 5,
      name: "Гарри Поттер и философский камень",
      author: { firstname: "Джоан", lastname: "Роулинг"},
      image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
    },
    {
      id: 6,
      name: "Гарри Поттер и философский камень",
      author: { firstname: "Джоан", lastname: "Роулинг"},
      image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
    },
    {
      id: 7,
      name: "Гарри Поттер и философский камень",
      author: { firstname: "Джоан", lastname: "Роулинг"},
      image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
    },
    {
      id: 8,
      name: "Гарри Поттер и философский камень",
      author: { firstname: "Джоан", lastname: "Роулинг"},
      image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
    }
];

  private _currentId : number = 10;
  constructor() { }

  public getAll() : Observable<IBookCard[]> {
    return of(this._books);
  }

  public addBook(bookAdd : IAddBookCard) : Observable<any> {
    this._currentId++;

    let book : IBookCard = {
      id: this._currentId,
      name: bookAdd.name,
      author: bookAdd.author,
      image: bookAdd.image
    }

    this._books.push(book);

    return of();
  }

  public editBook(editBookRequest : IEditBookCard) : Observable<any> {
    const index = this._books.findIndex(book => book.id === editBookRequest.id);
    if(index === -1) return of();

    this._books[index] = editBookRequest;
    return of();
  }

}

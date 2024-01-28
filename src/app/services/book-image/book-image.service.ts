import { Injectable, OnInit } from '@angular/core';
import { IAddBookImage, IBook, IBookImage, IEditBookImage } from '../../interfaces/book';
import { Observable, of } from 'rxjs';
import { AddBookImageComponent } from '../../components/dialogs/add-book-image/add-book-image.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookImageService{

  private _books: IBookImage[] = [];
  
  //   private _books : IBookImage[] = [
  //     {
  //       id: 1,
  //       name: "Гарри Поттер и философский камень",
  //       author: { firstname: "Джоан", lastname: "Роулинг"},
  //       image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
  //     },
  //     {
  //       id: 2,
  //       name: "Гарри Поттер и философский камень",
  //       author: { firstname: "Джоан", lastname: "Роулинг"},
  //       image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
  //     },
  //     {
  //       id: 3,
  //       name: "Гарри Поттер и философский камень",
  //       author: { firstname: "Джоан", lastname: "Роулинг"},
  //       image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
  //     },
  //     {
  //       id: 4,
  //       name: "Гарри Поттер и философский камень",
  //       author: { firstname: "Джоан", lastname: "Роулинг"},
  //       image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
  //     },
  //     {
  //       id: 5,
  //       name: "Гарри Поттер и философский камень",
  //       author: { firstname: "Джоан", lastname: "Роулинг"},
  //       image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
  //     },
  //     {
  //       id: 6,
  //       name: "Гарри Поттер и философский камень",
  //       author: { firstname: "Джоан", lastname: "Роулинг"},
  //       image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
  //     },
  //     {
  //       id: 7,
  //       name: "Гарри Поттер и философский камень",
  //       author: { firstname: "Джоан", lastname: "Роулинг"},
  //       image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
  //     },
  //     {
  //       id: 8,
  //       name: "Гарри Поттер и философский камень",
  //       author: { firstname: "Джоан", lastname: "Роулинг"},
  //       image: "https://upload.wikimedia.org/wikipedia/ru/b/b4/Harry_Potter_and_the_Philosopher%27s_Stone_%E2%80%94_movie.jpg"
  //     }
  // ];

  private _currentId: number = 10;
  constructor(
    private _dialog: MatDialog,
    private _httpClient: HttpClient,
    private _authService: AuthService,
  ) { 
    this.addBook({
      name: 'sdssa', 
      author: 'sss',
      imageUrl: 'asssa'
    });
  }

  // ngOnInit(): void {
  //   this.getAll().subscribe(books => {
  //     this._books = books;
  //   });    
  // }

  public getAll(): Observable<IBookImage[]> {
    let headers = new HttpHeaders({
      ['Content-Type']: 'application/json',
      ['Authorization']: 'Bearer ' + this._authService.accessToken,
    })

    return this._httpClient.get<IBookImage[]>(environment.apiUrlDocker + 'books', {
      headers: headers
    });
  }

  // public getAll() : Observable<IBookImage[]> {
  //   return of(this._books);
  // }

  public addBook(bookAdd: IAddBookImage): Observable<any> {
    console.log("IT'S ADD BOOK!");
    let headers = new HttpHeaders({
      ['Content-Type']: 'application/json',
      ['Authorization']: 'Bearer ' + this._authService.accessToken,
    })
    
    return this._httpClient.post<any>(environment.apiUrlDocker + 'books', JSON.stringify(bookAdd), {
      headers: headers});
  }

  // public addBook(bookAdd: IAddBookImage): Observable<any> {
  //   this._currentId++;

  //   let book: IBookImage = {
  //     id: this._currentId,
  //     name: bookAdd.name,
  //     author: bookAdd.author,
  //     imageUrl: bookAdd.imageUrl
  //   }

  //   this._books.push(book);

  //   return of();
  // }

  public addBookDialog(): void {
    const dialogRef = this._dialog.open(AddBookImageComponent);

    dialogRef.afterClosed().subscribe((result: IAddBookImage) => {
      if (!result) return;
      this.addBook(result).subscribe();
    });
  }

  public editBook(editBookRequest: IEditBookImage): Observable<any> {
    const index = this._books.findIndex(book => book.id === editBookRequest.id);
    if (index === -1) return of();

    this._books[index] = editBookRequest;
    return of();
  }

}

import { EventEmitter, Injectable } from '@angular/core';
import { IAddBookImage, IBookImage, IEditBookImage } from '../../interfaces/book';
import { Observable, switchMap, tap } from 'rxjs';
import { AddBookImageComponent } from '../../components/dialogs/add-book-image/add-book-image.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { DeleteBooksComponent } from '../../components/dialogs/delete-books/delete-books/delete-books.component';

@Injectable({
  providedIn: 'root'
})
export class BookImageService {

  public myEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  
  private _defaultImageUrl: string = 'https://i.ebayimg.com/thumbs/images/g/BdQAAOSwvZNhtArq/s-l1600.jpg';
  //rivate _defaultImageUrl: string = 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706486400&semt=sph;';

  constructor(
    private _dialog: MatDialog,
    private _httpClient: HttpClient,
  ) {
  }

  public getAll(): Observable<IBookImage[]> {
    return this._httpClient.get<IBookImage[]>(environment.apiUrlDocker + 'books');
  }

  public getBook(id: string): Observable<IBookImage> {
    return this._httpClient.get<IBookImage>(environment.apiUrlDocker + 'books/' + id);
  }

  public addBook(bookAdd: IAddBookImage): Observable<any> {
    console.log("IT'S ADD BOOK!");

    return this.isNotValidImageUrl(bookAdd.imageUrl).pipe(
      tap((result) => {
        if (result) {
          console.log('REALY AErroor');
          bookAdd.imageUrl = this._defaultImageUrl;
        }
      }),
      switchMap(() => this._httpClient.post<any>(environment.apiUrlDocker + 'books', JSON.stringify(bookAdd)))
    );
  }

  // private isValidImageUrl(url: string): boolean {
  //   const img = new Image();
  //   img.src = url;
  //   return img.complete && img.naturalWidth !== 0;
  // }

  private isNotValidImageUrl(url: string): Observable<boolean> {
    const img = new Image();
    img.src = url;

    return new Observable<boolean>((observer) => {
      
      // old code
      // img.onload = function () {
      //   observer.next(false);
      //   observer.complete();
      //   console.log('IMAGE Done');
      // };

      img.onload = function () {
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
          observer.next(true);
        } 
        else {
          observer.next(false);
        }

        observer.complete();
        console.log('IMAGE Done');
      };

      img.onerror = function () {
        console.log('IMAGE ErroR!!');
        observer.next(true);
        observer.complete();
      };

    })
  }

  public dialogBook(): void {
    const dialogRef = this._dialog.open(AddBookImageComponent);

    dialogRef.afterClosed().subscribe((result: IAddBookImage) => {
      if (!result) return;
      this.addBook(result).subscribe(() => {
        this.myEventEmitter.emit();
      });
    });
  }

  public dialogDeleteBook(): void {
    const dialogRef = this._dialog.open(DeleteBooksComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return;
      this.deleteAll().subscribe();
    });
  }


  public editBook(editBookModel: IEditBookImage): Observable<any> {
    console.log("IT'S EDIT BOOK!");

    return this.isNotValidImageUrl(editBookModel.imageUrl).pipe(
      tap((result) => {
        if (result) {
          console.log('REALY AErroor');
          editBookModel.imageUrl = this._defaultImageUrl;
        }
      }),
      switchMap(() => this._httpClient.put<any>(environment.apiUrlDocker + 'books/' + editBookModel.id, JSON.stringify(editBookModel)))
    );
  }

  public deleteBook(id: string): Observable<any> {
    return this._httpClient.delete<any>(environment.apiUrlDocker + 'books/' + id);
  }

  public deleteAll(): Observable<any> {
    return this._httpClient.delete<any>(environment.apiUrlDocker + 'books');
  }

  public generate(count: number): Observable<any> {
    return this._httpClient.post<any>(environment.apiUrlDocker + 'books/generate/' + count, null);
  }
}

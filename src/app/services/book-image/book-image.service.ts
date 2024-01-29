import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { IAddBookImage, IBook, IBookImage, IEditBookImage } from '../../interfaces/book';
import { Observable, of, tap } from 'rxjs';
import { AddBookImageComponent } from '../../components/dialogs/add-book-image/add-book-image.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Injectable({
  providedIn: 'root'
})
export class BookImageService {

  public myEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  private _defaultImageUrl: string = 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706486400&semt=sph;';

  constructor(
    private _dialog: MatDialog,
    private _httpClient: HttpClient,
    private _authService: AuthService,
  ) {
  }

  public getAll(): Observable<IBookImage[]> {
    let headers = new HttpHeaders({
      ['Content-Type']: 'application/json',
      ['Authorization']: 'Bearer ' + this._authService.accessToken,
    })

    return this._httpClient.get<IBookImage[]>(environment.apiUrlDocker + 'books', {
      headers: headers
    });
  }

  public addBook(bookAdd: IAddBookImage): Observable<any> {
    console.log("IT'S ADD BOOK!");
    let headers = new HttpHeaders({
      ['Content-Type']: 'application/json',
      ['Authorization']: 'Bearer ' + this._authService.accessToken,
    })

    if (!this.isValidImageUrl(bookAdd.imageUrl)) {
      bookAdd.imageUrl = this._defaultImageUrl;
    }

    return this._httpClient.post<any>(environment.apiUrlDocker + 'books', JSON.stringify(bookAdd), {
      headers: headers
    });
  }

  private isValidImageUrl(url: string): boolean {
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalWidth !== 0;
  }

  public addBookDialog(): void {
    const dialogRef = this._dialog.open(AddBookImageComponent);

    dialogRef.afterClosed().subscribe((result: IAddBookImage) => {
      if (!result) return;
      this.addBook(result).subscribe(() => {
        this.myEventEmitter.emit();
      });
    });
  }

  public editBook(editBookModel: IEditBookImage): Observable<any> {

    console.log("IT'S EDIT BOOK!");
    let headers = new HttpHeaders({
      ['Content-Type']: 'application/json',
      ['Authorization']: 'Bearer ' + this._authService.accessToken,
    })

    if (!this.isValidImageUrl(editBookModel.imageUrl)) {
      editBookModel.imageUrl = this._defaultImageUrl;
    }

    return this._httpClient.put<any>(environment.apiUrlDocker + 'books/' + editBookModel.id, JSON.stringify(editBookModel), {
      headers: headers
    });
  }

  public deleteBook(id: string): Observable<any> {
    let headers = new HttpHeaders({
      //['Content-Type']: 'application/json',
      ['Authorization']: 'Bearer ' + this._authService.accessToken,
    })

    return this._httpClient.delete<any>(environment.apiUrlDocker + 'books/' + id, {
      headers: headers
    });
  }

}

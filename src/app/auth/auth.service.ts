import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from './interfaces/login';
import { IRegister } from './interfaces/register';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _accessToken: string = '';
  private _user: string = '';

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  public get accessToken(): string {
    return this._accessToken;
  }

  public get isAuthorized(): boolean {
    return this._accessToken != '';
  }

  public get userName(): string {
    return this._user;
  }

  public login(model: ILogin): Observable<any> {
    let headers = new HttpHeaders({ ['Content-Type']: 'application/json' });

    return this.httpClient.post<any>(environment.apiUrl + 'auth/login', JSON.stringify(model), {
      headers: headers
    })
      .pipe(
        tap({
          next: result => {
            this._accessToken = result.accessToken;
            this.parseUserName();
          }, error: _ => {
            this._accessToken = '';
            this._user = '';
          }
        })
      );
  }

  public register(model: IRegister): Observable<any> {
    let headers = new HttpHeaders({ ['Content-Type']: 'application/json' });

    return this.httpClient.post(environment.apiUrl + 'auth/register', JSON.stringify(model), {
      headers: headers
    });
  }

  public logout(): void {
    this._user = '';
    this.router.navigate(['/login']);
  }

  private parseUserName(): void {
    let payload = this._accessToken.split(".")[1];
    let authDataString = atob(payload);
    let authData = JSON.parse(authDataString);
    this._user = `${authData.name} <${authData.email}>`;
  }
}

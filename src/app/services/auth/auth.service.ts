import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../../interfaces/login';
import { IRegister } from '../../interfaces/register';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _accessToken: string = '';
  private _user : string = 'delete';
  
  constructor(
    private router : Router,
    private httpClient: HttpClient,
  ) { }

  public get isAutorized() : boolean {
    return this._accessToken != '';
  }

  public get user() : string {
    return this._user;
  }

  public login(loginModel : ILogin) : Observable<any> {
    let headers = new HttpHeaders({['Content-type']: 'application/json'});

    return this.httpClient.post<any>(environment.apiUrl + 'auth/login', JSON.stringify(loginModel), {
      headers: headers
    })
    .pipe(
      tap({
        next: result => {
          this._accessToken = result.accessToken;
        },
        error: _ => {
          this._accessToken = '';
          this._user = '';
        }
      })
    );
  }

  // public login(loginModel : ILogin) : Observable<any> {
  //   let headers = new HttpHeaders({
  //     ['accept']: 'application/json',
  //     ['Content-type']: 'application/json'});

  //   return this.httpClient.post(environment.apiUrl + 'auth/register', JSON.stringify(loginModel), {
  //     headers: headers
  //   });
  // }

  public register(registerModel : IRegister) : Observable<any> {
    let headers = new HttpHeaders({['Content-type']: 'application/json'});

    return this.httpClient.post(environment.apiUrl + 'auth/register', JSON.stringify(registerModel), {
      headers: headers
    });
  }

  public logout() : void {
    this._user = '';
    this.router.navigate(['/login']);
  }
}

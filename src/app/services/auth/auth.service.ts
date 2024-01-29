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
  private _user : string = '';
  
  constructor(
    private router : Router,
    private httpClient: HttpClient,
  ) { }

  public get isAutorized() : boolean {
    return window.localStorage.getItem('accesToken') != '';
    //return this._accessToken != '';
  }

  public get accessToken() : string{
    let test = window.localStorage.getItem('accesToken'); 
    if(test == null) return '';
    return test;
    //return this._accessToken;
  }

  public get user() : string {
    return this._user;
  }

  // public isTokenValid(): boolean {
  //   try {
  //     const decoded = JSON.parse(atob(this._accessToken));
      
  //     if (new Date(decoded.exp * 1000) > new Date()) {
  //       console.log("TOKEN IS VALID")
  //       return true;
  //     } else {
  //       console.log("TOKEN IS NOT VALID")

  //       return false;
  //     }
  //   } catch (err) {
  //     console.log("TOKEN IS ERROR")

  //     return false;
  //   }
  // }

  public login(loginModel : ILogin) : Observable<any> {
    let headers = new HttpHeaders({['Content-type']: 'application/json'});

    return this.httpClient.post<any>(environment.apiUrlDocker + 'auth/login', JSON.stringify(loginModel), {
      headers: headers
    })
    .pipe(
      tap({
        next: result => {
          this._accessToken = result.accessToken;
          window.localStorage.setItem('accesToken', result.accessToken);
          this.parseUserName();
        },
        error: _ => {
          window.localStorage.setItem('accesToken', '');
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

    return this.httpClient.post(environment.apiUrlDocker + 'auth/register', JSON.stringify(registerModel), {
      headers: headers
    });
  }

  public logout() : void {
    this._accessToken = '';
    window.localStorage.setItem('accesToken', '');
    this._user = '';
    this.router.navigate(['/login']);
  }

  private parseUserName(): void {
    let authDataString = atob(this._accessToken.split('.')[1]);
    let authData = JSON.parse(authDataString);
    this._user = authData.name + ' <' + authData.email + '>';
  }
}
function jwt_decode(token: string) {
  throw new Error('Function not implemented.');
}


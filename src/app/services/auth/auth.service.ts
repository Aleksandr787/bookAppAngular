import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user : string = '';
  
  constructor(
    private router : Router
  ) { }

  public get isAutorized() : boolean {
    return this._user != '';
  }

  public get user() : string {
    return this._user;
  }

  public login(loginModel : ILogin) : void {
    this._user = loginModel.email;
    this.router.navigate(['/main']);
  }

  public logout() : void {
    this._user = '';
    this.router.navigate(['/login']);
  }
}

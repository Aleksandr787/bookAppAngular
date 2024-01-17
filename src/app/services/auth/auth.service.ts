import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAutorized : boolean = false;

  constructor(
    private router : Router
  ) { }

  public get isAutorized() : boolean {
    return this._isAutorized;
  }

  public login() : void {
    this._isAutorized = true;
    this.router.navigate(['/']);
  }

  public logout() : void {
    this._isAutorized = false;
    this.router.navigate(['/login']);
  }
}

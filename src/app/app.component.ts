import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { AuthService } from './services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'cm-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule,
        NavigationComponent,
        MatButtonModule
    ]
})
export class AppComponent {

  constructor(
    public authService : AuthService
  ) {
  }

  // public login() : void {
  //   this.authService.login();
  // }

  
  // public logout() : void {
  //   this.authService.logout();
  // }

  // public isAutorized() : boolean {
  //   return this.authService.isAutorized;
  // }
  title = 'lection-angular';
}
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { BookCardComponent } from '../../book-card/book-card.component';
import { MatSliderModule } from '@angular/material/slider';
import { BookImageService } from '../../../services/book-image/book-image.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cm-main-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule
  ],
  template: `
    <div *ngIf="authService.isAutorized" class="main-container">
      <div class="title">
        <h1>Hi, {{authService.user}}!</h1>
        <h1>This is a book library,</h1>
        <h1>Generate your books right now!</h1>
      </div>


      <div class="slider-wrapper">
        <mat-slider class="slider" min="0" max="30" step="1" discrete [displayWith]="formatLabel" >
          <input matSliderThumb #slider>
        </mat-slider>
      </div>

      <!-- <p>{{slider.value}}</p> -->
      <div class="button-wrapper-icons">
        <mat-icon class="material-symbols-outlined">arrow_forward</mat-icon>
          <button mat-flat-button (click)="generateBooks(slider.value)">Generate</button>
        <mat-icon class="material-symbols-outlined">arrow_back</mat-icon>
      </div>
    </div>
  
    <!-- <main class="main">
      <a *ngIf="!authService.isAutorized" mat-raised-button color="primary" (click)="login()"> Login  </a>
      <p> Welcome {{authService.user}}</p>
    </main> -->
  `,
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  public sliderValue: string = '';

  constructor(
    public authService: AuthService,
    private _bookImageService: BookImageService,
  ) {
  }


  public formatLabel(value: number): string {
    // if (value >= 1000) {
    //   return Math.round(value / 1000) + 'k';
    // }

    this.sliderValue = `${value}`;
    return `${value}`;
  }

  public generateBooks(count: string): void {
    const bookCount: number = parseInt(count, 10);
    this._bookImageService.generate(bookCount).subscribe();
  }


  // public logout(): void {
  //   this.authService.logout();
  // }

}

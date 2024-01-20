import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth/auth.service';
import { ILogin } from '../../../interfaces/login';

@Component({
  selector: 'cm-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="containerRegistration">
      <form [formGroup]="bookForm" class="bookCardForm">
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email">
          <mat-error *ngIf="email.hasError('required')">Email is required</mat-error>    
          <mat-error *ngIf="email.hasError('email')">Email is invalid</mat-error>    
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <mat-error *ngIf="password.hasError('required')">Password is required</mat-error>
          <input type="password" matInput formControlName="password">    
        </mat-form-field>
      </form>

      <button mat-flat-button [disabled]="bookForm.invalid" (click)="login()">Sign up</button>

      <!-- <div mat-dialog-actions>
        <button mat-flat-button (click)="onClose()">No Thanks</button>
        <button mat-flat-button (click)="onOk()" [disabled]="bookForm.invalid">Ok</button>
      </div> -->
    </div>
  `,
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  
  constructor(
    private _authService: AuthService
  ){}

  bookForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('',[ Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  
  public get name() : FormControl<string> {
    return this.bookForm.get('name') as FormControl<string>;
  }

  public get email() : FormControl<string> {
    return this.bookForm.get('email') as FormControl<string>;
  }

  public get password() : FormControl<string> {
    return this.bookForm.get('password') as FormControl<string>;
  }

  public login(){
    let loginModel : IRegistration = {
      email: this.email.value,
      password: this.password.value
    }
    this._authService.login(loginModel);
  }
}

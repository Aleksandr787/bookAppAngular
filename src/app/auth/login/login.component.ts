import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ILogin } from '../interfaces/login';
import { AuthService } from '../auth.service';

@Component({
  selector: 'cm-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authService: AuthService
  ) {    
  }

  public loginForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', Validators.required)
  });

  public get email(): FormControl<string> {
    return this.loginForm.get('email') as FormControl<string>;
  }

  public get password(): FormControl<string> {
    return this.loginForm.get('email') as FormControl<string>;
  }

  public login(): void {
    let loginModel: ILogin = {
      email: this.email.value,
      password: this.password.value
    };
    this.authService.login(loginModel);
  }
}

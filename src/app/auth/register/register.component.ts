import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';
import { IRegister } from '../interfaces/register';
import { Router } from '@angular/router';

@Component({
  selector: 'cm-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public registerForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', Validators.required)
  });

  public get name(): FormControl<string> {
    return this.registerForm.get('name') as FormControl<string>;
  }

  public get email(): FormControl<string> {
    return this.registerForm.get('email') as FormControl<string>;
  }

  public get password(): FormControl<string> {
    return this.registerForm.get('password') as FormControl<string>;
  }

  public register(): void {
    let registerModel: IRegister = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    };
    this.authService.register(registerModel).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}

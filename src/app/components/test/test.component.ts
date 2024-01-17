import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authGuard } from '../../guards/auth/auth.guard';
import { AuthService } from '../../services/auth/auth.service';
// NOT USING - DELETE
@Component({
  selector: 'cm-test',
  standalone: true,
  imports: [],
  template: `
    <p>
      test works!
    </p>
  `,
  styleUrl: './test.component.scss'
})
export class TestComponent{
  
  constructor(
    private _router : Router,
    private _authService : AuthService
  ) {
    
    if(this._authService.isAutorized){
      this._router.navigate(['/main']);
    }

    if(!this._authService.isAutorized){
      this._router.navigate(['/login']);
    }
  }
}

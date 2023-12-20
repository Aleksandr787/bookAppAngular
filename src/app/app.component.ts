import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

interface INavigationItem {
  id: string,
  label: string,
  icon: string
}

@Component({
  selector: 'cm-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lection-angular';

  public navLinks: INavigationItem[] = [
    {
      id: 'first',
      label: 'First Element',
      icon: 'home'
    },
    {
      id: 'second',
      label: 'Second Element',
      icon: 'home'
    },
    {
      id: 'third',
      label: 'Third Element',
      icon: 'home'
    }
  ];
  public activeLinkId: string = 'first';
}

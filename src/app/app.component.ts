import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
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
    MatListModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lection-angular';

  public navLinks: INavigationItem[] = [
    {
      id: '1',
      label: 'Inbox',
      icon: 'inbox'
    },
    {
      id: '2',
      label: 'Outbox',
      icon: 'send'
    },
    {
      id: '3',
      label: 'Favorites',
      icon: 'Favorite'
    },
    {
      id: '4',
      label: 'Trash',
      icon: 'delete'
    }
  ];

  public navLinksLabels: INavigationItem[] = [
    {
      id: '5',
      label: 'Label',
      icon: 'Fiber_manual_record'
    },
    {
      id: '6',
      label: 'Label',
      icon: 'change_history'
    },
    {
      id: '7',
      label: 'Label',
      icon: 'stop'
    },
    {
      id: '8',
      label: 'Label',
      icon: 'stop'
    }
  ];

  public activeLinkId: string = 'first';
}

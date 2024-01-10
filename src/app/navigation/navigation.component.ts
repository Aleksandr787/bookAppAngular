import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

interface INavigationItem {
  id: string,
  label: string,
  icon: string
}

@Component({
  selector: 'cm-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <div class="navigation">

      <div class="navigation__category">
        <span class="navigation__category__name">Books</span>
        
        <mat-nav-list>
          <a mat-list-item routerLink="main" routerLink="main" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">home</mat-icon>
              <span>Main Page</span>
            </div>
          </a>
          <a mat-list-item routerLink="books" routerLinkActive="mdc-list-item--activated">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">book_2</mat-icon>
              <span>My Books</span>
            </div>
          </a>

          @for (link of navLinks; track link) {
          <a mat-list-item [activated]="link.id === activeLinkId" (click)="activeLinkId = link.id">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">{{ link.icon }}</mat-icon>
              <span>{{ link.label }}</span>
            </div>
          </a>
          }
        </mat-nav-list>
      </div>

      <div class="line"></div>

      <div class="navigation__category">
        <span class="navigation__category__name">Labels</span>
        <mat-nav-list>
          @for (link of navLinksLabels; track link) {
          <a mat-list-item [activated]="link.id === activeLinkId" (click)="activeLinkId = link.id">
            <div class="navigation__category__item">
              <mat-icon class="navigation__category__item__icon material-symbols-outlined">{{ link.icon }}</mat-icon>
              <span>{{ link.label }}</span>
            </div>
          </a>
          }
        </mat-nav-list>
      </div>

    </div>
  `,
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  public navLinks: INavigationItem[] = [
    {
      id: '1',
      label: 'All books',
      icon: 'book_2'
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

  // public getLinkId(index: number): string | undefined {
  //   if (index >= 0 && index < this.navLinks.length) {
  //     return this.navLinks[index].id;
  //   }
  //   return undefined;
  // }

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

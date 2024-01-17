import { Routes } from '@angular/router';
import { BookListCardComponent } from './components/book-list-card/book-list-card.component';
import { BookCardComponent } from './components/book-card/book-card.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: BookCardComponent
    },
    {
        path: 'books',
        component: BookListCardComponent
    }
];

import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { Books2Component } from './books-2/books-2.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     component: BooksComponent
    // },
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: 'books-2',
        component: Books2Component
    }
];

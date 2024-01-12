import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { Books2Component } from './books-2/books-2.component';
import { authGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { nonAuthGuard } from './auth/guards/non-auth.guard';

export const routes: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     component: BooksComponent
    // },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [nonAuthGuard]
    },
    {
        path: 'books',
        component: BooksComponent,
        canActivate: [authGuard]
    },
    {
        path: 'books-2',
        component: Books2Component
    }
];

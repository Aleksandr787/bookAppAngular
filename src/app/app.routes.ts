import { Routes } from '@angular/router';
import { BookListCardComponent } from './components/book-list-card/book-list-card.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { authGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './components/login/login/login.component';
import { nonAuthGuard } from './guards/non-auth/non-auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
    },
    {
        path: 'main',
        component: BookCardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'books',
        component: BookListCardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [nonAuthGuard]
    },
];

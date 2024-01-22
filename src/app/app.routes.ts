import { Routes } from '@angular/router';
import { BookListCardComponent } from './components/book-list-card/book-list-card.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { authGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './components/login/login/login.component';
import { nonAuthGuard } from './guards/non-auth/non-auth.guard';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { TestComponent } from './components/test/test.component';
import { RegistrationComponent } from './components/registration/registration/registration.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
    },
    {
        path: 'main',
        component: MainPageComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'main',
                component: BookCardComponent,
                canActivate: [authGuard]
            },
            {
                path: 'books',
                component: BookListCardComponent,
                canActivate: [authGuard]
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [nonAuthGuard]
    },
    {
        path: 'register',
        component: RegistrationComponent,
        canActivate: [nonAuthGuard]
    },
];

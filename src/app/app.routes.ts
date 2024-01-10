import { Routes } from '@angular/router';
import { BookListCardComponent } from './book-list-card/book-list-card.component';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: TestComponent
    },
    {
        path: 'books',
        component: BookListCardComponent
    }
];

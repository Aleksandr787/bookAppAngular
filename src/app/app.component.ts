import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./navigation/navigation.component";
@Component({
    selector: 'cm-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule,
        NavigationComponent
    ]
})
export class AppComponent {

  title = 'lection-angular';
}
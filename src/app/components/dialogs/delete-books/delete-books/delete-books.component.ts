import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'cm-delete-books',
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <h1 mat-dialog-title class="headline">
      Delete all books?
    </h1>
    <div mat-dialog-content></div>
    
    <div mat-dialog-actions class="actions">
      <button mat-flat-button (click)="onClose()" >No</button>
      <button mat-flat-button (click)="onDelete()" >Yes</button>
<!-- 
      <p class="actions__text-button" (click)="onClose()" >Cansel</p>
      <p class="actions__text-button" (click)="onDelete()">Delete</p> -->
    </div>

    <!-- <div class="close">
      <button mat-icon-button (click)="onClose()">
        <mat-icon>arrow_back</mat-icon>
      </button>
    </div> -->
  `,
  styleUrl: './delete-books.component.scss'
})
export class DeleteBooksComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBooksComponent>,
    @Inject(MAT_DIALOG_DATA) private data: boolean,
  ) {
  }

  public onClose(): void {
    this.data = false;
    this.dialogRef.close(this.data);
  }

  public onDelete(): void {
    this.data = true;
    this.dialogRef.close(this.data);
  }
}

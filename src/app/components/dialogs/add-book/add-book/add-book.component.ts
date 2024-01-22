import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IBook, IAddBook, IEditBook } from '../../../../interfaces/book';

@Component({
  selector: 'cm-add-book',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h1 mat-dialog-title>Add Book</h1>
    <div mat-dialog-content>

        <form [formGroup]="bookForm" class="bookCardForm">
            <mat-form-field appearance="outline">
                <mat-label>Name</mat-label>
                <input matInput formControlName="name">    
            </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>FirstName</mat-label>
                <input matInput formControlName="authorFirstName">    
            </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>LastName</mat-label>
                <input matInput formControlName="authorLastName">    
            </mat-form-field>
        </form>

    </div>
    <div mat-dialog-actions>
      <button mat-flat-button (click)="onClose()">No Thanks</button>
      <button mat-flat-button (click)="onOk()" [disabled]="bookForm.invalid">Ok</button>
    </div>
  `,
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit {
  
  bookForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    authorFirstName: new FormControl<string>('', Validators.required),
    authorLastName: new FormControl<string>('', Validators.required),
  });
  
  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: IBook,
  ) {    
  }

  ngOnInit(): void {
    if(!this.data) return;

    this.bookForm.get('name')?.setValue(this.data.name);
    this.bookForm.get('authorFirstName')?.setValue(this.data.author.firstname);
    this.bookForm.get('authorLastName')?.setValue(this.data.author.lastname);

  }


  public onClose(): void {
    this.dialogRef.close();
  }

  public onOk() : void {
    if(this.data){
      this.onEdit();
    }
    else{
      this.onAdd();
    }
  }

  private onEdit(): void {
    if(!this.data) return;

    let book : IEditBook = {
      id: this.data?.id,
      name: this.bookForm.get("name")?.value ?? '',
      author: {
        firstname: this.bookForm.get("authorFirstName")?.value ?? '',
        lastname: this.bookForm.get("authorLastName")?.value ?? '',
      }
    }

    this.dialogRef.close(book);
  }

  private onAdd(): void {
    let book : IAddBook = {
      name: this.bookForm.get("name")?.value ?? '',
      author: {
        firstname: this.bookForm.get("authorFirstName")?.value ?? '',
        lastname: this.bookForm.get("authorLastName")?.value ?? '',
      }
    }

    this.dialogRef.close(book);
  }
}

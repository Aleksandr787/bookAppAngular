import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IAddBook, IBook, IEditBook } from '../../../interfaces/book';

@Component({
  selector: 'cm-add-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit {

  public bookForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    authorFirstName: new FormControl<string>('', Validators.required),
    authorLastName: new FormControl<string>('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: IBook
  ) {
  }

  public ngOnInit(): void {
    if (this.data) {
      this.bookForm.get('name')?.setValue(this.data.name);
      // this.bookForm.get('authorFirstName')?.setValue(this.data.author.firstName);
      // this.bookForm.get('authorLastName')?.setValue(this.data.author.lastName);
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onOk(): void {
    if (this.data) {
      this.onEdit();
    } else {
      this.onAdd();
    }
  }

  private onAdd(): void {
    let book: IAddBook = {
      name: this.bookForm.get('name')?.value ?? '',
      author: {
        firstName: this.bookForm.get('authorFirstName')?.value ?? '',
        lastName: this.bookForm.get('authorLastName')?.value ?? ''
      }
    };
    this.dialogRef.close(book);
  }

  private onEdit(): void {
    if (!this.data) return;

    let book: IEditBook = {
      id: this.data.id,
      name: this.bookForm.get('name')?.value ?? '',
      author: {
        firstName: this.bookForm.get('authorFirstName')?.value ?? '',
        lastName: this.bookForm.get('authorLastName')?.value ?? ''
      }
    };
    this.dialogRef.close(book);
  }
}

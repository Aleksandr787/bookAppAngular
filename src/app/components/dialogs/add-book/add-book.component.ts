import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IAddBookCard, IBookCard, IEditBookCard } from '../../../interfaces/book';
import { MatButtonModule } from '@angular/material/button';

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

  bookForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    authorFirstName: new FormControl<string>('', Validators.required),
    authorLastName: new FormControl<string>('', Validators.required),
    imageUrl: new FormControl<string>('')
  });
  
  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: IBookCard,
  ) {    
  }

  ngOnInit(): void {
    if(!this.data) return;

    this.bookForm.get('name')?.setValue(this.data.name);
    this.bookForm.get('authorFirstName')?.setValue(this.data.author.firstname);
    this.bookForm.get('authorLastName')?.setValue(this.data.author.lastname);
    this.bookForm.get('imageUrl')?.setValue(this.data.image);

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

    let book : IEditBookCard = {
      id: this.data?.id,
      name: this.bookForm.get("name")?.value ?? '',
      author: {
        firstname: this.bookForm.get("authorFirstName")?.value ?? '',
        lastname: this.bookForm.get("authorLastName")?.value ?? '',
      },
      image: this.bookForm.get("imageUrl")?.value ?? ''
    }

    this.dialogRef.close(book);
  }

  private onAdd(): void {
    let book : IAddBookCard = {
      name: this.bookForm.get("name")?.value ?? '',
      author: {
        firstname: this.bookForm.get("authorFirstName")?.value ?? '',
        lastname: this.bookForm.get("authorLastName")?.value ?? '',
      },
      image: this.bookForm.get("imageUrl")?.value ?? ''
    }

    this.dialogRef.close(book);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { IBook } from '../interfaces/book';

@Pipe({
  name: 'book',
  standalone: true
})
export class BookPipe implements PipeTransform {

  public transform(book: IBook, ...args: unknown[]): string {
    //return book.author.lastName + " " + book.author.firstName[0] + ".: " + book.name;
    return `${book.author.lastName} ${book.author.firstName[0]}.: ${book.name}`; 
  }

}

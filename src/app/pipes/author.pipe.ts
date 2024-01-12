import { Pipe, PipeTransform } from '@angular/core';
import { IBookCard } from '../interfaces/book';

@Pipe({
  name: 'author',
  standalone: true
})
export class AuthorPipe implements PipeTransform {

  transform(book: IBookCard, ...args: unknown[]): string {
    return book.author.firstname + " " + book.author.lastname;
  }

}

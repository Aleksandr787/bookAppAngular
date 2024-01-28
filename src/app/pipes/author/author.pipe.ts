import { Pipe, PipeTransform } from '@angular/core';
import { IBookImage } from '../../interfaces/book';

@Pipe({
  name: 'author',
  standalone: true
})
export class AuthorPipe implements PipeTransform {

  transform(book: IBookImage, ...args: unknown[]): string {
    return book.author;
  }

}

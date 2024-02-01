import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookImageService } from '../../../services/book-image/book-image.service';
import { IBookImage } from '../../../interfaces/book';

@Component({
  selector: 'cm-book-info',
  standalone: true,
  imports: [],
  template: `
    <p>
      {{book.author}} {{book.name}}
      book-info works!
    </p>
  `,
  styleUrl: './book-info.component.scss'
})
export class BookInfoComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);
  public book: IBookImage = {
    id: '',
    name: '',
    author: '',
    imageUrl: ''
  };

  constructor(
    private _router: Router,
    private _bookImageService: BookImageService
  ) {

    const bookId : string = this.route.snapshot.params['id'];
    this._bookImageService.getBook(bookId).subscribe((book) => {
      this.book = book;
    });
    // this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
    //   this.housingLocation = housingLocation;
    // });
  }
}

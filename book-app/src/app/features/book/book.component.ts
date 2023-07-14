import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'book-book',
  templateUrl: './book.component.html',
})

export class BookComponent {

  books = [{id:"",title:"Test"}];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

  }
}

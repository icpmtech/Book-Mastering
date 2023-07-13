import { Component } from '@angular/core';

@Component({
  selector: 'book-book',
  templateUrl: './book.component.html',
})
export class BookComponent {

  books = [{id:"",title:"Test"}];

  constructor() {}
}

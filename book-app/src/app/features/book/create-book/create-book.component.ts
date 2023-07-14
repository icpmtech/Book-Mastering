import { Component} from '@angular/core';
import {
  TuiTablePaginationOptions,
  tuiTablePaginationOptionsProvider,
} from '@taiga-ui/addon-table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TuiCurrency} from '@taiga-ui/addon-commerce';
import {TuiDay, TuiTime} from '@taiga-ui/cdk';
import { BookService } from '../book.service';
const customOptionContent: TuiTablePaginationOptions['sizeOptionContent'] = ({
  $implicit,
  total,
}) => {
  switch ($implicit) {
      case 10:
          return 'Ten';
      case total:
          return 'Show all rows';
      default:
          return $implicit;
  }
};


class Book {
  constructor(
      readonly title: string,
  ) {}
}

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
  providers: [
    tuiTablePaginationOptionsProvider({sizeOptionContent: customOptionContent}),
],
})
export class CreateBookComponent {

  /**
   *
   */
  constructor(private bookService:BookService) {
   

  }
  items = [
    {
        caption: 'Books',
        routerLink: '/book/list-books',
    },
    {
      caption: 'Create Book',
      routerLink: '/book/create-books',
  },
    
    
];


books = [
  new Book(`title 1`),
];

bookForm = new FormGroup({
  title: new FormControl(``, Validators.required),
  
});
question: any;
submit() {
  const  question  = this.bookForm.value.title;
   const res= this.bookService.getTitles(question);
}

}

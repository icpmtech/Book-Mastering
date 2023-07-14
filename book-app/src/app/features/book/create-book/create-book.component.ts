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
  values: any;

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
submit() {
  const  question  = this.bookForm.value.title as string;
  this.bookService.getTitles(question)
  .subscribe(
    (response: any) => {                           //next() callback
      console.log('response received')
      this.values = response; 
      alert(JSON.stringify(response));
      console.log(response);
    },
    (error: any) => {                              //error() callback
      alert(JSON.stringify(error));
      
    },
    () => {                                   //complete() callback
      alert("complete");      //This is actually not needed 
      
    })
}

}

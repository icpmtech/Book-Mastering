import { Component} from '@angular/core';
import {
  TuiTablePaginationOptions,
  tuiTablePaginationOptionsProvider,
} from '@taiga-ui/addon-table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { BookService } from '../book.service';
import { CreateBook, Title } from '../models/CreateBook';
import { SuggetionsTitleBook } from '../models/SuggetionsTitleBook';
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


@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
  providers: [
    tuiTablePaginationOptionsProvider({sizeOptionContent: customOptionContent}),
],
})
export class CreateBookComponent {
  titles!: SuggetionsTitleBook[];

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

createBookForm = new FormGroup({
  url: new FormControl(``, Validators.required),
  tableContents: new FormControl(``, Validators.required),
  dedication: new FormControl(``, Validators.required),
  preface: new FormControl(``, Validators.required),
  title: new FormControl(``, Validators.required),
  author: new FormControl(``, Validators.required),
});

titeSuggestionsForm = new FormGroup({
  title: new FormControl(``, Validators.required),

});
submitGetTitleSuggestions() {
  const  question  = this.titeSuggestionsForm.value.title as string;
  this.bookService.getTitles(question)
  .subscribe(
    (response: any) => {                           //next() callback
      console.log('response received')
      this.titles = response as SuggetionsTitleBook[];
      console.log(response);
    },
    (error: any) => {                              //error() callback
      alert(JSON.stringify(error));

    },
    () => {                                   //complete() callback
      console.log("complete");      //This is actually not needed

    });
}
submitCreateBook() {
  const createBook= new CreateBook();
  createBook.url  = this.createBookForm.value.url as string;
 createBook.tableContents  = this.createBookForm.value.tableContents as string;
 createBook.dedication  = this.createBookForm.value.dedication as string;
 createBook.preface  = this.createBookForm.value.preface as string;
 createBook.author  = this.createBookForm.value.author as string;
 createBook.title  = this.createBookForm.value.title as string;
  this.bookService.createBook(createBook)
  .subscribe(
    (response: any) => {                           //next() callback
      console.log('response received')
     alert(JSON.stringify(response));
      console.log(response);
    },
    (error: any) => {                              //error() callback
      alert(JSON.stringify(error));

    },
    () => {                                   //complete() callback
      console.log("complete");      //This is actually not needed

    });
}
}

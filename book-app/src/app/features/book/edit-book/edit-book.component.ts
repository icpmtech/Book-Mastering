import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { SuggetionsTitleBook } from '../models/SuggetionsTitleBook';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditBook,Title } from '../models/EditBook';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent {
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
      caption: 'Edit Book',
      routerLink: '/book/edit-books',
  },


];

editBookForm = new FormGroup({
  url: new FormControl(``, Validators.required),
  tableContents: new FormControl(``, Validators.required),
  dedication: new FormControl(``, Validators.required),
  preface: new FormControl(``, Validators.required),
  title: new FormControl(``, Validators.required),

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
  const editBook= new EditBook();
  editBook.title=new Title();
  editBook.url  = this.editBookForm.value.url as string;
 editBook.tableContents  = this.editBookForm.value.tableContents as string;
 editBook.dedication  = this.editBookForm.value.dedication as string;
 editBook.preface  = this.editBookForm.value.preface as string;
 editBook.title.title  = this.editBookForm.value.title as string;
  this.bookService.editBook(editBook)
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

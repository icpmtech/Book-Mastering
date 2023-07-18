import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { SuggetionsTitleBook } from '../models/SuggetionsTitleBook';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditBook,Title } from '../models/EditBook';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.scss']
})
export class DetailBookComponent {
  titles!: SuggetionsTitleBook[];
bookId: any|number;
  
  
  /**
   *
   */
  constructor(private bookService:BookService) {
    this.bookService.getBookById(1).subscribe(
      (response: any) => {                           //next() callback
        console.log('response received')
        this.bookId=response.id;
        this.detailBookForm.controls.id.setValue(response.id);
        this.detailBookForm.controls.preface.setValue(response.preface);
        this.detailBookForm.controls.url.setValue(response.url);
        this.detailBookForm.controls.tableContents.setValue(response.tableContents);
        this.detailBookForm.controls.dedication.setValue(response.dedication);
        this.detailBookForm.controls.author.setValue(response.author);
        this.detailBookForm.controls.title.setValue(response.title?.title);
        console.log(response);
      },
      (error: any) => {                              //error() callback
        alert(JSON.stringify(error));
  
      },
      () => {                                   //complete() callback
        console.log("complete");      //This is actually not needed
  
      });
  }
  items = [
    {
        caption: 'Books',
        routerLink: '/book/list-books',
    },
    {
      caption: 'Detail Book',
      routerLink: '/book/detail-books',
  },


];
detailBookForm = new FormGroup({
  url: new FormControl(``, Validators.required),
  id: new FormControl(``, Validators.required),
  tableContents: new FormControl(``, Validators.required),
  dedication: new FormControl(``, Validators.required),
  preface: new FormControl(``, Validators.required),
  title: new FormControl(``, Validators.required),
  author: new FormControl(``, Validators.required),

});

}

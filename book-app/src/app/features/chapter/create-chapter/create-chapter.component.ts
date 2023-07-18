import { Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ChapterService } from '../chapter.service';
import { CreateChapter } from '../models/CreateChapter';
import { SuggetionsChapterContent } from '../models/SuggetionsChapterContent';

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss'],
})
export class CreateChapterComponent {
  titles!: SuggetionsChapterContent[];

  /**
   *
   */
  constructor(private chapterService:ChapterService) {


  }
  items = [
    {
        caption: 'Chapters',
        routerLink: '/chapter/list-chapters',
    },
    {
      caption: 'Create Chapter',
      routerLink: '/chapter/create-chapters',
  },


];

createChapterForm = new FormGroup({
  
  title: new FormControl(``, Validators.required),
  body: new FormControl(``, Validators.required)
});

titeSuggestionsForm = new FormGroup({
  title: new FormControl(``, Validators.required),

});
submitGetChapterContentSuggestion() {
  const  question  = this.titeSuggestionsForm.value.title as string;
  this.chapterService.getTitles(question)
  .subscribe(
    (response: any) => {                           //next() callback
      console.log('response received')
      this.titles = response as SuggetionsChapterContent[];
      console.log(response);
    },
    (error: any) => {                              //error() callback
      alert(JSON.stringify(error));

    },
    () => {                                   //complete() callback
      console.log("complete");      //This is actually not needed

    });
}
submitCreateChapter() {
  const createChapter= new CreateChapter();
  createChapter.body  = this.createChapterForm.value.body as string;
 createChapter.title  = this.createChapterForm.value.title as string;
  this.chapterService.createChapter(createChapter)
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

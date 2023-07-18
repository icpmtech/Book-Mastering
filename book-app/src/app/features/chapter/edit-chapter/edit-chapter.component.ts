import { Component } from '@angular/core';
import { ChapterService } from '../chapter.service';
import { SuggetionsChapterContent } from '../models/SuggetionsChapterContent';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditChapter } from '../models/EditChapter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.scss']
})
export class EditChapterComponent {
  titles!: SuggetionsChapterContent[];
  
  
  /**
   *
   */
  constructor(private chapterService:ChapterService,private router:Router) {
    
  }

  ngOnInit() {
    const id=this.router.url.split('/')[3];
          this.chapterService.getChapterById(id as any|number).subscribe(
            (response: any) => {                           //next() callback
              console.log('response received')
              this.editChapterForm.controls.id.setValue(response.id);
              this.editChapterForm.controls.title.setValue(response.title);
              this.editChapterForm.controls.body.setValue(response.body);
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
        caption: 'Chapters',
        routerLink: '/chapter/list-chapters',
    },
    {
      caption: 'Edit Chapter',
      routerLink: '/chapter/edit-chapters',
  },


];
editChapterForm = new FormGroup({
  id: new FormControl<number>(0, Validators.required),
  title: new FormControl(``, Validators.required),
  body: new FormControl(``, Validators.required),

});

titeSuggestionsForm = new FormGroup({
  title: new FormControl(``, Validators.required),

});
submitGetTitleSuggestions() {
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
submitEditChapter() {
  const editChapter= new EditChapter();
 editChapter.id  = this.editChapterForm.value.id as number;
 editChapter.body  = this.editChapterForm.value.body as string;
 editChapter.title  = this.editChapterForm.value.title as string;
  this.chapterService.editChapter(editChapter)
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

import { Component } from '@angular/core';
import { SectionService } from '../section.service';
import { SuggetionsSectionContent } from '../models/SuggetionsSectionContent';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditSection } from '../models/EditSection';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent {
  titles!: SuggetionsSectionContent[];
  editSectionForm = new FormGroup({
    id: new FormControl<number>(0, Validators.required),
    title: new FormControl(``, Validators.required),
    body: new FormControl(``, Validators.required),
  
  });
  
  /**
   *
   */
  constructor(private sectionService:SectionService,private route: ActivatedRoute,private router: Router) {
    
  }
  items = [
    {
        caption: 'Sections',
        routerLink: '/section/list-sections',
    },
    {
      caption: 'Edit Section',
      routerLink: '/section/edit-sections',
  },


];

ngOnInit() {
  const id=this.router.url.split('/')[3];
      this.sectionService.getSectionById(id as any|number).subscribe(
        (response: any) => {                           //next() callback
          console.log('response received')
          this.editSectionForm.controls.id.setValue(response.id);
          this.editSectionForm.controls.title.setValue(response.title);
          this.editSectionForm.controls.body.setValue(response.body);
          console.log(response);
        },
        (error: any) => {                              //error() callback
          alert(JSON.stringify(error));
    
        },
        () => {                                   //complete() callback
          console.log("complete");      //This is actually not needed
    
        });
}

titeSuggestionsForm = new FormGroup({
  title: new FormControl(``, Validators.required),

});
submitGetSectionContentSuggestion() {
  const  question  = this.titeSuggestionsForm.value.title as string;
  this.sectionService.getTitles(question)
  .subscribe(
    (response: any) => {                           //next() callback
      console.log('response received')
      this.titles = response as SuggetionsSectionContent[];
      console.log(response);
    },
    (error: any) => {                              //error() callback
      alert(JSON.stringify(error));

    },
    () => {                                   //complete() callback
      console.log("complete");      //This is actually not needed

    });
}
submitEditSection() {
  const editSection= new EditSection();
 editSection.id  = this.editSectionForm.value.id as number;
 editSection.body  = this.editSectionForm.value.body as string;
 editSection.title  = this.editSectionForm.value.title as string;
  this.sectionService.editSection(editSection)
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

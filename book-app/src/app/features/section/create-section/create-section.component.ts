import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SectionService } from '../section.service';
import { CreateSection } from '../models/CreateSection';
import { SuggetionsSectionContent } from '../models/SuggetionsSectionContent';
@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss'],
})
export class CreateSectionComponent {
  titles!: SuggetionsSectionContent[];
  constructor(private sectionService: SectionService) {
  }
  items = [
    {
      caption: 'Sections',
      routerLink: '/section/list-sections',
    },
    {
      caption: 'Create Section',
      routerLink: '/section/create-sections',
    },
  ];

  createSectionForm = new FormGroup({
    title: new FormControl(``, Validators.required),
    body: new FormControl(``, Validators.required)
  });

  titeSuggestionsForm = new FormGroup({
    title: new FormControl(``, Validators.required),

  });
  submitGetSectionContentSuggestion() {
    const question = this.titeSuggestionsForm.value.title as string;
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
  submitCreateSection() {
    const createSection = new CreateSection();
    createSection.body = this.createSectionForm.value.title as string;
    createSection.body = this.createSectionForm.value.body as string;
    this.sectionService.createSection(createSection)
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

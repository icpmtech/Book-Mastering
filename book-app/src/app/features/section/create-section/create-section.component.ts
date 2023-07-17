import { Component} from '@angular/core';
import {
  TuiTablePaginationOptions,
  tuiTablePaginationOptionsProvider,
} from '@taiga-ui/addon-table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { SectionService } from '../section.service';
import { CreateSection, Title } from '../models/CreateSection';
import { SuggetionsSectionContent } from '../models/SuggetionsSectionContent';
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
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss'],
  providers: [
    tuiTablePaginationOptionsProvider({sizeOptionContent: customOptionContent}),
],
})
export class CreateSectionComponent {
  titles!: SuggetionsSectionContent[];

  /**
   *
   */
  constructor(private sectionService:SectionService) {


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
  url: new FormControl(``, Validators.required),
  tableContents: new FormControl(``, Validators.required),
  dedication: new FormControl(``, Validators.required),
  preface: new FormControl(``, Validators.required),
  title: new FormControl(``, Validators.required),
  content: new FormControl(``, Validators.required)
});

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
submitCreateSection() {
  const createSection= new CreateSection();
  createSection.title=new Title();
  createSection.url  = this.createSectionForm.value.url as string;
 createSection.tableContents  = this.createSectionForm.value.tableContents as string;
 createSection.dedication  = this.createSectionForm.value.dedication as string;
 createSection.preface  = this.createSectionForm.value.preface as string;
 createSection.title.title  = this.createSectionForm.value.title as string;
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

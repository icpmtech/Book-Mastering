import {ChangeDetectionStrategy, Component, Inject, TemplateRef} from '@angular/core';
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { EditBook } from '../models/EditBook';
import { ChapterService } from '../../chapter/chapter.service';
import { ListChapter } from '../../chapter/models/ListChapter';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-modal-book-chapter',
    templateUrl: './modal-add-chapter-book.component.html',
    styleUrls: ['./modal-add-chapter-book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAddChapterToBookComponent {
    value: ListChapter | null = null;
    name = '';
   items=[];

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<ListChapter, EditBook>,private chapterService: ChapterService
    ) {

        this.chapterService.getChapters().subscribe(
            (response: any) => {                           //next() callback
              console.log('response received')
              this.items=response;
            },
            (error: any) => {                              //error() callback
              alert(JSON.stringify(error));
        
            },
            () => {                                   //complete() callback
              console.log("complete");      //This is actually not needed
        
            });


    }
   
    get hasValue(): boolean {
        return this.value !== null;
    }

    get data(): EditBook {
        return this.context.data;
    }

    submit(): void {
        if (this.value !== null) {
            this.context.completeWith(this.value);
        }
    }

    showDialog(content: TemplateRef<TuiDialogContext>): void {
        this.dialogs.open(content, {dismissible: true}).subscribe();
    }
}

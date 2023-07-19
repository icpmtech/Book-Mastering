import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TuiComparator} from '@taiga-ui/addon-table';
import {
    TUI_DEFAULT_MATCHER,
    tuiDefaultSort,
    tuiIsFalsy,
} from '@taiga-ui/cdk';
import {TUI_ARROW} from '@taiga-ui/kit';
import {BehaviorSubject,  Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import { ChapterService } from '../chapter.service';
import { ListChapter } from '../models/ListChapter';

interface Chapter {
    readonly id: number;
    readonly title: string;
}



type Key = 'id' | 'title';


const KEYS: Record<string, Key> = {
    Id: 'id',
    Title: 'title',
};

@Component({
  selector: 'app-list-chapter',
  templateUrl: './list-chapter.component.html',
  styleUrls: ['./list-chapter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListChapterComponent {
showDialogWithCustomButton(arg0: any) {
throw new Error('Method not implemented.');
}
    private readonly size$ = new BehaviorSubject(10);
    private readonly page$ = new BehaviorSubject(0);

    readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
    readonly sorter$ = new BehaviorSubject<Key>('title');

    readonly minAge = new FormControl(21);

    readonly request$ = this.chapterService.getChapters().pipe(
        (response: any) => {                           //next() callback
          console.log('response received')
         return response;
        },
       );

    /**
     *
     */
    constructor(private chapterService:ChapterService) {
       

    }
    initial: readonly string[] = ['Name', 'Creation Date', 'Chapters'];

    enabled = this.initial;

    columns = ['id','title', 'body', 'actions'];

    search = '';

    readonly arrow = TUI_ARROW;

    readonly loading$ = this.request$.pipe(map(tuiIsFalsy));

    

    readonly data$: Observable<readonly ListChapter[]> =this.chapterService.getChapters();

    onEnabled(enabled: readonly string[]): void {
        this.enabled = enabled;
        this.columns = this.initial
            .filter(column => enabled.includes(column))
            .map(column => KEYS[column]);
    }

    onDirection(direction: -1 | 1): void {
        this.direction$.next(direction);
    }

    onSize(size: number): void {
        this.size$.next(size);
    }

    onPage(page: number): void {
        this.page$.next(page);
    }

    isMatch(value: unknown): boolean {
        return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
    }

    getAge(chapter: Chapter): number {
        return getId(chapter);
    }

    
}

function sortBy(key: 'id' | 'title', direction: -1 | 1): TuiComparator<Chapter> {
    return (a, b) => tuiDefaultSort(a[key], b[key]);
}

function getId({id}: Chapter): number {
    

    return id;
}

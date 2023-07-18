import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TuiComparator} from '@taiga-ui/addon-table';
import {
    TUI_DEFAULT_MATCHER,
    tuiControlValue,
    TuiDay,
    tuiDefaultSort,
    tuiIsFalsy,
    tuiIsPresent,
    tuiToInt,
} from '@taiga-ui/cdk';
import {TUI_ARROW} from '@taiga-ui/kit';
import {BehaviorSubject, combineLatest, Observable, timer} from 'rxjs';
import {debounceTime, filter, map, share, startWith, switchMap} from 'rxjs/operators';
import { BookService } from '../book.service';
import { CreateBook } from '../models/CreateBook';
import { ListBook } from '../models/ListBook';
import { TuiDialogService } from '@taiga-ui/core';

interface Book {
    readonly id: number;
    readonly title: string;
}


type Key =  'title' | 'id';


const KEYS: Record<string, Key> = {
    Id: 'id',
    Title: 'title',
};

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBookComponent {
    private readonly size$ = new BehaviorSubject(10);
    private readonly pbody$ = new BehaviorSubject(0);

    readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
    readonly sorter$ = new BehaviorSubject<Key>('id');

    readonly minAge = new FormControl(21);

    readonly request$ = this.bookService.getBooks().pipe(
        (response: any) => {                           //next() callback
          console.log('response received')
         return response;
        },
       );

    /**
     *
     */
    constructor(private bookService:BookService,private readonly dialogs: TuiDialogService) {
       

    }
  

    showDialogWithCustomButton(itemBook:ListBook): void {
        this.dialogs
            .open(`You are sure you want delete the  book: ${itemBook.title}`, {
                label: `Delete Book:${itemBook.title}`,
                size: 's',
                data: {button: 'Delete'},
                closeable:true
            })
            .subscribe();
    }
    initial: readonly string[] = ['Id', 'Title', 'Preface'];

    enabled = this.initial;

    columns = ['id', 'title', 'preface','actions'];

    search = '';

    readonly arrow = TUI_ARROW;

    readonly loading$ = this.request$.pipe(map(tuiIsFalsy));

    

    readonly data$: Observable<readonly ListBook[]> =this.bookService.getBooks().pipe(
        (response: any) => {                           //next() callback
          console.log('response received')
         return response;
        },
       );

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

    onPbody(pbody: number): void {
        this.pbody$.next(pbody);
    }

    isMatch(value: unknown): boolean {
        return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
    }

  

    
}

function sortBy(key: 'title' | 'id', direction: -1 | 1): TuiComparator<Book> {
    return (a, b) =>direction * tuiDefaultSort(a[key], b[key]);
}



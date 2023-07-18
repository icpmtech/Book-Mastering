import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TuiComparator} from '@taiga-ui/addon-table';
import {
    TUI_DEFAULT_MATCHER,
    tuiDefaultSort,
    tuiIsFalsy,
} from '@taiga-ui/cdk';
import {TUI_ARROW} from '@taiga-ui/kit';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { SectionService } from '../section.service';
import { ListSection } from '../models/ListSection';

interface Section {
    readonly id: number;
    readonly title: string;
}


type Key = 'id' | 'title' | 'body';


const KEYS: Record<string, Key> = {
    Id: 'id',
    Title: 'title',
    Body: 'body',
};

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSectionComponent {
showDialogWithCustomButton(_t66: any) {
throw new Error('Method not implemented.');
}
    private readonly size$ = new BehaviorSubject(10);
    private readonly page$ = new BehaviorSubject(0);

    readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
    readonly sorter$ = new BehaviorSubject<Key>('id');

    readonly minAge = new FormControl(21);

    readonly request$ = this.sectionService.getSections().pipe(
        (response: any) => {                           //next() callback
          console.log('response received')
         return response;
        },
       );

    /**
     *
     */
    constructor(private sectionService:SectionService) {
       

    }
    initial: readonly string[] = ['Id', 'Title', 'Body','Actions'];

    enabled = this.initial;

    columns = ['id', 'title', 'body','actions'];

    search = '';

    readonly arrow = TUI_ARROW;

    readonly loading$ = this.request$.pipe(map(tuiIsFalsy));

    

    readonly data$: Observable<readonly ListSection[]> =this.sectionService.getSections().pipe(
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

    onPage(page: number): void {
        this.page$.next(page);
    }

    isMatch(value: unknown): boolean {
        return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
    }

  
    
}

function sortBy(key: 'id' | 'title', direction: -1 | 1): TuiComparator<Section> {
    return (a, b) => direction * tuiDefaultSort(a[key], b[key]);
}



import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TuiComparator} from '@taiga-ui/addon-table';
import {
    TUI_DEFAULT_MATCHER,
    TuiDay,
    tuiDefaultSort,
    tuiIsFalsy,
    tuiToInt,
} from '@taiga-ui/cdk';
import {TUI_ARROW} from '@taiga-ui/kit';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { SectionService } from '../section.service';
import { ListSection } from '../models/ListSection';

interface Section {
    readonly name: string;
    readonly dob: TuiDay;
}

const TODAY = TuiDay.currentLocal();
const FIRST = [
    'John',
    'Jane',
    'Jack',
    'Jill',
    'James',
    'Joan',
    'Jim',
    'Julia',
    'Joe',
    'Julia',
];

const LAST = [
    'Smith',
    'West',
    'Brown',
    'Jones',
    'Davis',
    'Miller',
    'Johnson',
    'Jackson',
    'Williams',
    'Wilson',
];

type Key = 'age' | 'dob' | 'name';

const DATA: readonly Section[] = Array.from({length: 300}, () => ({
    name: `${LAST[Math.floor(Math.random() * 10)]}, ${
        FIRST[Math.floor(Math.random() * 10)]
    }`,
    dob: TODAY.append({day: -Math.floor(Math.random() * 4000) - 7500}),
}));
const KEYS: Record<string, Key> = {
    Name: 'name',
    Age: 'age',
    'Date of Birth': 'dob',
};

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSectionComponent {
    private readonly size$ = new BehaviorSubject(10);
    private readonly page$ = new BehaviorSubject(0);

    readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
    readonly sorter$ = new BehaviorSubject<Key>('name');

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
    initial: readonly string[] = ['Name', 'Creation Date', 'Sections'];

    enabled = this.initial;

    columns = ['name', 'dob', 'age'];

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

    getAge(user: Section): number {
        return getAge(user);
    }

    
}

function sortBy(key: 'age' | 'dob' | 'name', direction: -1 | 1): TuiComparator<Section> {
    return (a, b) =>
        key === 'age'
            ? direction * tuiDefaultSort(getAge(a), getAge(b))
            : direction * tuiDefaultSort(a[key], b[key]);
}

function getAge({dob}: Section): number {
    const years = TODAY.year - dob.year;
    const months = TODAY.month - dob.month;
    const days = TODAY.day - dob.day;
    const offset = tuiToInt(months > 0 || (!months && days > 9));

    return years + offset;
}

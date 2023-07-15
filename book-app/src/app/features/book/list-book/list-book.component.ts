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

interface Book {
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

const DATA: readonly Book[] = Array.from({length: 300}, () => ({
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
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBookComponent {
    private readonly size$ = new BehaviorSubject(10);
    private readonly page$ = new BehaviorSubject(0);

    readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
    readonly sorter$ = new BehaviorSubject<Key>('name');

    readonly minAge = new FormControl(21);

    readonly request$ = combineLatest([
        this.sorter$,
        this.direction$,
        this.page$,
        this.size$,
        tuiControlValue<number>(this.minAge),
    ]).pipe(
        // zero time debounce for a case when both key and direction change
        debounceTime(0),
        switchMap(query => this.getData(...query).pipe(startWith(null))),
        share(),
    );

    initial: readonly string[] = ['Name', 'Creation Date', 'Chapters'];

    enabled = this.initial;

    columns = ['name', 'dob', 'age'];

    search = '';

    readonly arrow = TUI_ARROW;

    readonly loading$ = this.request$.pipe(map(tuiIsFalsy));

    readonly total$ = this.request$.pipe(
        filter(tuiIsPresent),
        map(({length}) => length),
        startWith(1),
    );

    readonly data$: Observable<readonly Book[]> = this.request$.pipe(
        filter(tuiIsPresent),
        map(users => users.filter(tuiIsPresent)),
        startWith([]),
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

    getAge(user: Book): number {
        return getAge(user);
    }

    private getData(
        key: 'age' | 'dob' | 'name',
        direction: -1 | 1,
        page: number,
        size: number,
        minAge: number,
    ): Observable<ReadonlyArray<Book | null>> {
        console.info('Making a request');

        const start = page * size;
        const end = start + size;
        const result = [...DATA]
            .sort(sortBy(key, direction))
            .filter(user => getAge(user) >= minAge)
            .map((user, index) => (index >= start && index < end ? user : null));

        // Imitating server response
        return timer(3000).pipe(map(() => result));
    }
}

function sortBy(key: 'age' | 'dob' | 'name', direction: -1 | 1): TuiComparator<Book> {
    return (a, b) =>
        key === 'age'
            ? direction * tuiDefaultSort(getAge(a), getAge(b))
            : direction * tuiDefaultSort(a[key], b[key]);
}

function getAge({dob}: Book): number {
    const years = TODAY.year - dob.year;
    const months = TODAY.month - dob.month;
    const days = TODAY.day - dob.day;
    const offset = tuiToInt(months > 0 || (!months && days > 9));

    return years + offset;
}

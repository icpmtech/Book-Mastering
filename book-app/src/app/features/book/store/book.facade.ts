import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as bookActions from './book.actions';
import * as bookSelectors from './book.selectors';

@Injectable()
export class bookFacade {
  book$ = this.store.select(bookSelectors.selectbook);
  user$ = this.store.select(bookSelectors.selectbookUser);
  isLoggedIn$ = this.store.select(bookSelectors.selectIsLoggedIn);
  isLoadingBook$ = this.store.select(bookSelectors.selectIsLoadingBook);
  hasBookError$ = this.store.select(bookSelectors.selectBookError);

  constructor(private store: Store) {}

  Book(username: string|any, password:  string|any) {
    this.store.dispatch(bookActions.BookRequest({ username, password }));
  }

  logout() {
    this.store.dispatch(bookActions.logout());
  }

  getbookUser() {
    this.store.dispatch(bookActions.getbookUserRequest());
  }
}

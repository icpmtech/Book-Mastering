import { createFeatureSelector, createSelector } from '@ngrx/store';

import { bookState } from './book.models';
import { book_FEATURE_KEY } from './book.reducer';

export const selectbook = createFeatureSelector<bookState>(book_FEATURE_KEY);

export const selectIsLoggedIn = createSelector(selectbook, state => state.isLoggedIn);

export const selectBookError = createSelector(selectbook, state => state.hasBookError);

export const selectIsLoadingBook = createSelector(
  selectbook,
  state => state.isLoadingBook
);

export const selectbookUser = createSelector(selectbook, state => state.user);

import { Action, createReducer, on } from '@ngrx/store';

import * as bookActions from './book.actions';
import { bookState, TokenStatus } from './book.models';

export const book_FEATURE_KEY = 'book';

export interface bookPartialState {
  readonly [book_FEATURE_KEY]: bookState;
}

export const initialState: bookState = {
  isLoggedIn: false,
  user: undefined,
  accessTokenStatus: TokenStatus.PENDING,
  refreshTokenStatus: TokenStatus.PENDING,
  isLoadingBook: false,
  hasBookError: false,
};

const reducer = createReducer(
  initialState,

  // Book
  on(
    bookActions.BookRequest,
    (state): bookState => ({
      ...state,
      accessTokenStatus: TokenStatus.VALIDATING,
      isLoadingBook: true,
      hasBookError: false,
    })
  ),

  // Refresh token
  on(
    bookActions.refreshTokenRequest,
    (state): bookState => ({
      ...state,
      refreshTokenStatus: TokenStatus.VALIDATING,
    })
  ),

  // Book & Refresh token
  on(
    bookActions.BookSuccess,
    bookActions.refreshTokenSuccess,
    (state): bookState => ({
      ...state,
      isLoggedIn: true,
      isLoadingBook: false,
      accessTokenStatus: TokenStatus.VALID,
      refreshTokenStatus: TokenStatus.VALID,
    })
  ),
  on(
    bookActions.BookFailure,
    bookActions.refreshTokenFailure,
    (state, action): bookState => ({
      ...state,
      isLoadingBook: false,
      accessTokenStatus: TokenStatus.INVALID,
      refreshTokenStatus: TokenStatus.INVALID,
      hasBookError: action.type === '[book] Book Failure' && !!action.error,
    })
  ),

  // Logout
  on(
    bookActions.logout,
    (): bookState => ({
      ...initialState,
    })
  ),

  // book user
  on(
    bookActions.getbookUserSuccess,
    (state, action): bookState => ({
      ...state,
      user: action.user,
    })
  ),
  on(
    bookActions.getbookUserFailure,
    (): bookState => ({
      ...initialState,
    })
  )
);

export function bookReducer(state: bookState | undefined, action: Action): bookState {
  return reducer(state, action);
}

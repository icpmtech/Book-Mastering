import { createAction, props } from '@ngrx/store';

import { bookUser } from './book.models';

// Book
export const BookRequest = createAction(
  '[book] Book Request',
  props<{ username: string|any; password: string|any }>()
);
export const BookSuccess = createAction('[book] Book Success');
export const BookFailure = createAction(
  '[book] Book Failure',
  props<{ error: Error }>()
);

// Logout
export const logout = createAction('[book] Logout');

// book User: me
export const getbookUserRequest = createAction('[book] book User Request');
export const getbookUserSuccess = createAction(
  '[book] book User Success',
  props<{ user: bookUser }>()
);
export const getbookUserFailure = createAction('[book] book User Failure');

// Refresh token
export const refreshTokenRequest = createAction('[book] Refresh Token Request');
export const refreshTokenSuccess = createAction('[book] Refresh Token Success');
export const refreshTokenFailure = createAction('[book] Refresh Token Failure');

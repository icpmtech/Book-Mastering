import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';

import { TokenStorageService } from '../../../core/services';
import { bookService } from '../book.service';
import * as bookActions from './book.actions';

@Injectable()
export class BookEffects {
  Book$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookActions.BookRequest),
      exhaustMap(credentials =>
        this.bookService.Book(credentials.username, credentials.password).pipe(
          map(data => {
            // save tokens
            this.tokenStorageService.saveTokens(data.access_token, data.refresh_token);
            // trigger Book success action
            return bookActions.BookSuccess();
          }),
          catchError(error => of(bookActions.BookFailure({ error })))
        )
      )
    );
  });

  onBookSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookActions.BookSuccess),
      map(() => {
        // redirect to return url or home
        this.router.navigateByUrl(
          this.activatedRoute.snapshot.queryParams['returnUrl'] || '/'
        );
        return bookActions.getbookUserRequest();
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(bookActions.logout),
        exhaustMap(() => {
          this.router.navigateByUrl('/');
          return this.bookService
            .logout()
            .pipe(finalize(() => this.tokenStorageService.removeTokens()));
        })
      );
    },
    { dispatch: false }
  );

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookActions.refreshTokenSuccess, bookActions.getbookUserRequest),
      exhaustMap(() =>
        this.bookService.getbookUser().pipe(
          map(user => bookActions.getbookUserSuccess({ user })),
          catchError(() => of(bookActions.getbookUserFailure()))
        )
      )
    );
  });

  refreshToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookActions.refreshTokenRequest),
      exhaustMap(() =>
        this.bookService.refreshToken().pipe(
          map(data => {
            // save tokens
            this.tokenStorageService.saveTokens(data.access_token, data.refresh_token);
            // trigger refresh token success action
            return bookActions.refreshTokenSuccess();
          }),
          catchError(() => of(bookActions.refreshTokenFailure()))
        )
      )
    );
  });

  onBookOrRefreshTokenFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(bookActions.BookFailure, bookActions.refreshTokenFailure),
        tap(() => {
          this.tokenStorageService.removeTokens();
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private bookService: bookService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) {}
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { ConfigService, TokenStorageService } from '../../core/services';
import * as bookActions from './store/book.actions';
import { bookState, bookUser, TokenStatus } from './store/book.models';
import * as bookSelectors from './store//book.selectors';

export interface AccessData {
  token_type: 'Bearer';
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class bookService {
  private hostUrl: string;

  constructor(
    private store: Store,
    private http: HttpClient,
    private configService: ConfigService,
    private tokenStorageService: TokenStorageService
  ) {
    this.hostUrl = this.configService.getAPIUrl();
    const bookConfig = this.configService.getbookSettings();
  }

  /**
   * Returns a promise that waits until
   * refresh token and get book user
   *
   * @returns {Promise<bookState>}
   */
  init(): Promise<bookState> {
    this.store.dispatch(bookActions.refreshTokenRequest());

    const bookState$ = this.store.select(bookSelectors.selectbook).pipe(
      filter(
        book =>
          book.refreshTokenStatus === TokenStatus.INVALID ||
          (book.refreshTokenStatus === TokenStatus.VALID && !!book.user)
      ),
      take(1)
    );

    return lastValueFrom(bookState$);
  }

  /**
   * Performs a request with user credentials
   * in order to get book tokens
   *
   * @param {string} username
   * @param {string} password
   * @returns Observable<AccessData>
   */
  Book(username: string, password: string): Observable<AccessData> {
    return this.http.post<AccessData>(`${this.hostUrl}/api/book/Book`, {
      grant_type: 'password',
      username,
      password,
    });
  }

  /**
   * Performs a request for logout bookenticated user
   *
   * @param {('all' | 'allButCurrent' | 'current')} [clients='current']
   * @returns Observable<void>
   */
  logout(clients: 'all' | 'allButCurrent' | 'current' = 'current'): Observable<void> {
    const params = new HttpParams().append('clients', clients);

    return this.http.get<void>(`${this.hostUrl}/api/book/logout`, { params });
  }

  /**
   * Asks for a new access token given
   * the stored refresh token
   *
   * @returns {Observable<AccessData>}
   */
  refreshToken(): Observable<AccessData> {
    const refreshToken = this.tokenStorageService.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('Refresh token does not exist'));
    }

    return this.http.post<AccessData>(`${this.hostUrl}/api/book/Book`, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
  }

  /**
   * Returns bookenticated user
   * based on saved access token
   *
   * @returns {Observable<bookUser>}
   */
  getbookUser(): Observable<bookUser> {
    return this.http.get<bookUser>(`${this.hostUrl}/api/users/me`);
  }
}

export const bookServiceInitProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (bookService: bookService) => () => bookService.init(),
  deps: [bookService],
  multi: true,
};

import { Component } from '@angular/core';

import { AuthFacade } from '../../../auth/store/auth.facade';

@Component({
  selector: 'book-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly menuItems = [
    { link: '/home', label: 'Home', icon: null },
    { link: '/about', label: 'About', icon: null },
    { link: '/secured-feat', label: 'Secured Feature', icon: 'tuiIconLock' },
    { link: '/book', label: 'Books', icon: 'tuiIconLock' },
  ];
  authUser$ = this.authFacade.user$;

  constructor(private authFacade: AuthFacade) {}

  logout() {
    this.authFacade.logout();
  }
}

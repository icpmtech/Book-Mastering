/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthFacade } from '../store/auth.facade';

@Component({
  selector: 'book-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  isLoading$ = this.authFacade.isLoadingLogin$;
  showLoginError$ = this.authFacade.hasLoginError$;

  constructor(private authFacade: AuthFacade) {}

  submit() {
    const  password  = this.loginForm.value.password;
    const  username=this.loginForm.value.username;
    this.authFacade.login(username, password);
  }
}

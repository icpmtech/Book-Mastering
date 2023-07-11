import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() { }

  login(username: string, password: string): boolean {
    // Perform authentication logic here
    // Set isAuthenticated to true if login is successful

    return this.isAuthenticated;
  }

  logout(): void {
    // Perform logout logic here
    // Set isAuthenticated to false
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}

import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly validUser = 'admin';
  private readonly validPassword = 'admin';
  readonly loggedIn = signal(false);

  login(username: string, password: string): boolean {
    const isValid = username === this.validUser && password === this.validPassword;
    this.loggedIn.set(isValid);
    return isValid;
  }

  logout(): void {
    this.loggedIn.set(false);
  }
}

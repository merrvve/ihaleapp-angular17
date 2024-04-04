import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedInSubject.asObservable();

  constructor(private router: Router) { }

  login() {
    this._isLoggedInSubject.next(true);
    this.router.navigate(['/'])
  }

  logout() {
    this._isLoggedInSubject.next(false);
    this.router.navigate(['/login'])
  }

  isUserLoggedIn() {
    return this._isLoggedInSubject.value;
  }
}

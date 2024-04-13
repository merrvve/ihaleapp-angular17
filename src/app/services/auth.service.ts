import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedInSubject.asObservable();

  private _userSubject = new BehaviorSubject<User>({ 
    id:"asda", token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzNDEwOTI1LCJpYXQiOjE3MTI5Nzg5MjUsImp0aSI6IjdiZTA5NjkwMGE3YjQ5MDhhMWQ2NjBjN2VlOTdkZjFkIiwidXNlcl9pZCI6MX0.BfyBTitY0D30BVRKCh6-oxxK4H3LBQg4XTpTPGsxC_U", role:"ISVEREN",email:"",adi:"sample",soyadi:"sample",telefon:""
   });
  user$ = this._userSubject.asObservable();

  token! : string | null;
  constructor(private router: Router) { }

  login() {
    this._isLoggedInSubject.next(true);
     this.token="sampletoken"
    this.router.navigate(['/'])
  }

  logout() {
    this._isLoggedInSubject.next(false);
    this.router.navigate(['/login'])
  }

  isUserLoggedIn() {
    return this._isLoggedInSubject.value;
  }

  getAuthorizationToken() {
    return this._userSubject.value.token;
  }
}

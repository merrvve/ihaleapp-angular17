import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedInSubject.asObservable();

  private _userSubject = new BehaviorSubject<User>({ 
    id:"", token:"", role:"",email:"",adi:"",soyadi:"",telefon:""
   });
  user$ = this._userSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    this.http.post(environment.apiUrl+"/token/pair",{username:email, password: password}).subscribe(
      {
        next:(result:any)=> {
          this._userSubject.value.token=result.access;
          this.http.get(environment.apiUrl+'/ihale/login').subscribe(
            {
              next:(result:any)=>{
                this._isLoggedInSubject.next(true);
                this._userSubject.value.email=result.email;
                this._userSubject.value.id=result.id;
                this._userSubject.value.role =result.role;
                this._userSubject.value.adi =result.adi;
                this._userSubject.value.soyadi =result.soyadi;
                this._userSubject.value.telefon =result.telefon;
                this._userSubject.value.firmaYetkilisi =result.firmaYetkilisi;
                if(result.role==="ISVEREN") {
                  this.router.navigate(['/isveren']);
                }
                else if(result.role==="TEKLIFCI") {
                  this.router.navigate(['/teklifci']);
                }

              },
              error:(error)=>console.log(error)
            }
          );

        },
        error:(error)=> {
          console.log(error);
        }
      }
    );
  }

  logout() {
    this._isLoggedInSubject.next(false);
    this._userSubject.next({ 
      id:"", token:"", role:"",email:"",adi:"",soyadi:"",telefon:""
     });
    this.router.navigate(['/login'])
  }

  isUserLoggedIn() {
    return this._isLoggedInSubject.value;
  }

  getAuthorizationToken() {
    return this._userSubject.value.token;
  }

  getUserRole() {
    return this._userSubject.value.role;
  }
}

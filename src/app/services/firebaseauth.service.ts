import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { user } from '@angular/fire/auth';
import { doc, getDoc } from "firebase/firestore";
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { UserDetail } from '../models/user-detail.interface';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
 // userSubscription: Subscription;
  private firestore = inject(Firestore);

  private _isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedInSubject.asObservable();

  //user$!: Observable<UserDetails | null>;
  _userDetails = new BehaviorSubject<UserDetail | null>(null);
  userDetails$ = this._userDetails.asObservable();
  
  constructor(private router: Router) {
  }

  private fetchUserDetails(uid: string) {
    const userProfileDocRef = doc(this.firestore, 'users', uid);
    getDoc(userProfileDocRef).then((documentSnapshot) => {
      if (documentSnapshot) {
        const roleData = documentSnapshot.data();
        let currentDetail = this._userDetails.getValue();
        if(currentDetail && roleData) {
          currentDetail.role = roleData['role'];
        
        }
        this._userDetails.next(currentDetail);
        console.log(this._userDetails.value)
      } else {
        // Document not found
        console.log('No such document!');
      }
    }).catch((error) => {
    });
   
  }
  

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      (aUser)=> {
        this.getUserDetails(aUser.user);
        this._isLoggedInSubject.next(true);      
        this.fetchUserDetails(aUser.user.uid)}
    ).catch(error=>console.log(error));
  }

  getUserDetails(firebaseResult: any) {
    let userDetails : UserDetail = {
      role: undefined,
      uid: firebaseResult.uid,
      accessToken: firebaseResult.accessToken,
      displayName: firebaseResult.displayName,
      email: firebaseResult.email,
      emailVerified: firebaseResult.emailVerified,
      phoneNumber: firebaseResult.phoneNumber,
      photoUrl: firebaseResult.photoUrl,
      creationTime: firebaseResult.metadata.creationTime,
      lastSignInTime: firebaseResult.metadata.lastSignInTime
    }
    this._userDetails.next(userDetails);
  }
  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        const uid = userCredential.user?.uid;
        if (uid) {
          // Set user role in Firestore document (optional, based on your logic)
          // ...
        }
      });
  }

  logout() {
    this._userDetails.next(null);
    this._isLoggedInSubject.next(false);
    
    signOut(this.auth);
    this.router.navigate(['/login'])
  }

  isUserLoggedIn(): boolean {
    return this._isLoggedInSubject.value;
  }

  getUserRole(): string | undefined{
    console.log(this._userDetails.value?.role)
    return this._userDetails.value?.role;
  }

  getAuthorizationToken() {
    return this._userDetails.value?.accessToken;
  }
  // ngOnDestroy() {
  //   this.userSubscription.unsubscribe();
  // }
}



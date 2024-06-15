import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { User, user } from '@angular/fire/auth';
import { doc, getDoc, collection } from "firebase/firestore";
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
// import {
//   Firestore,
// } from '@angular/fire/firestore';

interface UserDetails {
  role: string;
  // Add other properties for additional user information (e.g., name, profilePicture)
}

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
  _userDetails = new BehaviorSubject<UserDetails | null>({role:""});
  userDetails$ = this._userDetails.asObservable();
  
  constructor(private router: Router) {
//     this.userSubscription = this.user$.subscribe((aUser: User | null) => {
//       if(aUser) {
// //        this._userDetails.next({role:"ISVEREN"});
//         this.fetchUserDetails(aUser.uid)
//         this._isLoggedInSubject.next(true);
//       }
//       else {
//         this._isLoggedInSubject.next(false);
//       }
//       //handle user state changes here. Note, that user will be null if there is no currently logged in user.
//    console.log(aUser);
//   })
    // this.user$ = this.auth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       // Check if userDetails is already fetched from Firestore
    //       if (!this.userDetails) {
    //         // Fetch user details from Firestore based on user.uid (implementation details omitted)
    //         this.fetchUserDetails(user.uid).subscribe(details => this.userDetails = details);
    //       }
    //       return of(this.userDetails);
    //     }
    //     return of(null);
    //   })
    // );
  }

  private fetchUserDetails(uid: string) {
    const userProfileDocRef = doc(this.firestore, 'users', uid);
    getDoc(userProfileDocRef).then((documentSnapshot) => {
      if (documentSnapshot) {
        this._userDetails.next(documentSnapshot.data() as UserDetails) ;
        console.log(this._userDetails.value)
      } else {
        // Document not found
        console.log('No such document!');
      }
    }).catch((error) => {
    });
   
    
    // return collection<UserDetails>('users').doc(uid).valueChanges()
    //   .pipe(
    //     map(userData => {
    //       if (userData) {
    //         return userData; // Return user data if exists
    //       } else {
    //         return null; // Return null if user document not found
    //       }
    //     })
    //   );
  }
  

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      (aUser)=> {
        this._isLoggedInSubject.next(true);      
        this.fetchUserDetails(aUser.user.uid)}
    ).catch(error=>console.log(error));
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

  // ngOnDestroy() {
  //   this.userSubscription.unsubscribe();
  // }
}



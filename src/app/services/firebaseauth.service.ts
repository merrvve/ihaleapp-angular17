import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { user } from '@angular/fire/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserDetail } from '../models/user-detail.interface';
import { User } from '../models/user.interface';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  currentUser!: User;

  private firestore = inject(Firestore);

  private _isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedInSubject.asObservable();

  _userDetails = new BehaviorSubject<UserDetail | null>(null);
  userDetails$ = this._userDetails.asObservable();

  constructor(private router: Router,
   private messageService: MessagesService
  ) {}

  private fetchUserDetails(uid: string) {
    const userProfileDocRef = doc(this.firestore, 'users', uid);
    getDoc(userProfileDocRef)
      .then((documentSnapshot) => {
        if (documentSnapshot) {
          this._userDetails.next(documentSnapshot.data() as UserDetail);
          console.log(this._userDetails.value, this.currentUser);
        } else {
          // Document not found
          this.messageService.showError("Kullanıcı bilgileri alınamadı. ");
        }
      })
      .catch((error) => {
        this.messageService.showError("Kullanıcı bilgileri alınamadı. " + error.message)
      });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((aUser) => {
        this.getUserInfo(aUser.user);
        this.messageService.showSuccess("Giriş Başarılı");
        this._isLoggedInSubject.next(true);
        this.fetchUserDetails(aUser.user.uid);
      })
      .catch((error) => this.messageService.showError("Giriş Başarısız. " + error.message));
  }

  getUserInfo(firebaseResult: any) {
    let user: User = {
      uid: firebaseResult.uid,
      accessToken: firebaseResult.accessToken,
      displayName: firebaseResult.displayName,
      email: firebaseResult.email,
      emailVerified: firebaseResult.emailVerified,
      phoneNumber: firebaseResult.phoneNumber,
      photoUrl: firebaseResult.photoUrl,
      creationTime: firebaseResult.metadata.creationTime,
      lastSignInTime: firebaseResult.metadata.lastSignInTime,
    };
    this.currentUser = user;
  }
  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => {
        const uid = userCredential.user?.uid;
        if (uid) {
          // Set user role in Firestore document
          // ...
        }
      },
    );
  }

  logout() {
    this._userDetails.next(null);
    this._isLoggedInSubject.next(false);

    signOut(this.auth);
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return this._isLoggedInSubject.value;
  }

  getUserRole(): string | undefined {
    return this._userDetails.value?.role;
  }

  getAuthorizationToken() {
    return this.currentUser.accessToken;
  }

  getUser() {
    return this.currentUser;
  }
}

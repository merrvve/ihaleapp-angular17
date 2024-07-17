import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc, onSnapshot, query, where } from '@angular/fire/firestore';
import { UserDetail } from '../models/user-detail.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class BidderService {
  private firestore = inject(Firestore); 
  biddersSubject = new BehaviorSubject<UserDetail[]>([]);
  constructor() { }

  getBidders() {
    const biddersQuery = query(collection(this.firestore, 'users'), where('role', '==', 'BIDDER'));

    onSnapshot(biddersQuery, (querySnapshot) => {
      const bidders: UserDetail[] = [];
       querySnapshot.forEach((doc) => {
         let bidderData = doc.data() as UserDetail;
         bidderData.uid = doc.id;
         bidders.push(bidderData);
        });
        this.biddersSubject.next(bidders)
    })
    return this.biddersSubject.asObservable();
    
  }

  public getBidderDetails(uid: string) {
    const userProfileDocRef = doc(this.firestore, 'users', uid);
    getDoc(userProfileDocRef).then((documentSnapshot) => {
      if (documentSnapshot) {
        const bidderDetail = documentSnapshot.data() as UserDetail;
        return bidderDetail;
      } else {
        return null;
      }
    }).catch((error) => {
      console.log(error);
    });
   
  }

  

}

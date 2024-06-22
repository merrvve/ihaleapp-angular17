import { Injectable, inject } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import { CollectionReference, Firestore, addDoc, collection, doc, getDoc, getDocs, query, runTransaction, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { Tender } from '../models/tender';
import { TablodataService } from './tablodata.service';
import { FirebaseAuthService } from './firebaseauth.service';
import { TenderService } from './tender.service';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private firestore = inject(Firestore); 
  
  tenderSubject = new BehaviorSubject<Tender|null>(null)
  tender$ = this.tenderSubject.asObservable();
  
  bidsSubject = new BehaviorSubject<TenderBid[]|null>(null)
  bids$ = this.bidsSubject.asObservable();
  
  constructor(private tableService: TablodataService,
    private authService: FirebaseAuthService,
  ) { }

  createBid() {
    const tenderId = this.tenderSubject.value?.id  || ''
    const currentTableData = this.tableService.currentData;
    let data: { [key: number]: any } = {};
    for (let i = 0; i < currentTableData.length; i++) {
      data[i] = currentTableData[i];
    }
    let bidData: TenderBid = {
      bidder_id: this.authService.currentUser.uid,
      created_at: new Date().toDateString(),
      total_price: 0,
      discovery_data: data
    }
    console.log(tenderId)
      const tenderRef = doc(this.firestore, "tenders", tenderId);
      console.log(tenderRef)
      const colRef = collection(tenderRef, 'bids');
     // const tenderDoc = await transaction.get(tenderRef); // Get tender document
   
      return from(addDoc(colRef, bidData)).pipe(
        map((docRef) => docRef.id)
      );    
  }

  getBidsByBidderId(bidderId?: string): Observable<TenderBid[]> {
    if (!bidderId) {
      bidderId = this.authService.getUser()?.uid || '';
    }
  
    const tendersCollection =  collection(this.firestore, 'tenders');
    const tendersQuery = query(tendersCollection); // Reference tenders collection
  
    return from(getDocs(tendersQuery)).pipe(
      map((querySnapshot) => {
        const bids: TenderBid[] = [];
        querySnapshot.forEach((tenderDoc) => {
          const tenderData = tenderDoc.data() as Tender;
  
          // Check if bidder ID matches (optional, based on your requirements)
          
            const tenderId = tenderDoc.id;
            const bidsRef = collection(tenderDoc.ref, 'bids'); // Reference bids subcollection
  
            // Use `getDocs` or `onSnapshot` (depending on your needs) to retrieve bids
            from(getDocs(bidsRef))
              .subscribe((bidsSnapshot) => {
                bidsSnapshot.forEach((bidDoc) => {
                  const bid = bidDoc.data() as TenderBid;
                  bid.id=bidDoc.id;
                  bids.push(bid);
                });
              });
          
        });
        this.bidsSubject.next(bids);
        return bids;
      })
    );
  }
  
  
}

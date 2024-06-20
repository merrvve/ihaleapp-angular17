import { Injectable, inject } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import { CollectionReference, Firestore, addDoc, collection, doc, getDoc, runTransaction } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { Tender } from '../models/tender';
import { TablodataService } from './tablodata.service';
import { FirebaseAuthService } from './firebaseauth.service';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private firestore = inject(Firestore); 
  
  tenderSubject = new BehaviorSubject<Tender|null>(null)
  tender$ = this.tenderSubject.asObservable();
  constructor(private tableService: TablodataService,
    private authService: FirebaseAuthService
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
}

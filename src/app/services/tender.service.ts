import { Injectable, inject } from '@angular/core';
import { Tender } from '../models/tender';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, getDocs, onSnapshot, query, where } from '@angular/fire/firestore';
import { FirebaseAuthService } from './firebaseauth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  private tendersSubject = new Subject<Tender[]>();
  private _currentTender = new BehaviorSubject<Tender>({
    owner_id: '',
    name: '',
    description: '',
    created_at: Date.now().toString(),
    currency: '',
    cost: 0,
    requestedDocuments: [],
    tenderFiles: [],
    bidders: [],
    isCompleted: false,
    isDraft: false,
    discovery_data: []
  });
  currentTender$ = this._currentTender.asObservable(); 

  private firestore = inject(Firestore); 
  tendersCollection!: CollectionReference;

  
  constructor(private authService: FirebaseAuthService) {
    this.tendersCollection = collection(this.firestore, 'tenders')
  
  }

  
  createTender() {
    let tender = this._currentTender.getValue();
    tender.owner_id = this.authService.getUser()?.uid || '';
    addDoc(this.tendersCollection, tender ).then((documentReference: DocumentReference) => {
      console.log(documentReference);
  });

  }

  getTendersByOwnerId() {
    const userId = this.authService.getUser()?.uid || '';
    const tendersQuery = query(this.tendersCollection, where('owner_id', '==', userId));

    onSnapshot(tendersQuery, (querySnapshot) => {
      const tenders: Tender[] = [];
      querySnapshot.forEach((doc) => {
        let tenderData = doc.data() as Tender;
        tenderData.id = doc.id;
        tenders.push(tenderData);
        this.tendersSubject.next(tenders);
      });
     
    });
    return this.tendersSubject.asObservable();
  }


}

import { Injectable, inject } from '@angular/core';
import { Tender } from '../models/tender';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from '@angular/fire/firestore';
import { FirebaseAuthService } from './firebaseauth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, from, map } from 'rxjs';
import { TablodataService } from './tablodata.service';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  private tendersSubject = new Subject<Tender[]>();
  _currentTender = new BehaviorSubject<Tender>({
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
  });
  tenders$ = this.tendersSubject.asObservable();
  currentTender$ = this._currentTender.asObservable(); 

  private firestore = inject(Firestore); 
  tendersCollection!: CollectionReference;

  
  constructor(private authService: FirebaseAuthService, private tableData: TablodataService ) {
    this.tendersCollection = collection(this.firestore, 'tenders')
  
  }

  
  createTender() {
    let tender = this._currentTender.getValue();
    let currentTableData = this.tableData.currentData;
    let data: { [key: number]: any } = {};
    for (let i = 0; i < currentTableData.length; i++) {
      data[i] = currentTableData[i];
    }
    tender.discoveryData = data;
    tender.owner_id = this.authService.getUser()?.uid || '';
    console.log(tender)
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

  getTenderById(tenderId: string): Observable<Tender | null> {
    const tenderDocRef = doc(this.tendersCollection, tenderId);
    return from(getDoc(tenderDocRef)).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          return docSnapshot.data() as Tender;
        } else {
          return null;
        }
      })
    );
  }

  

}

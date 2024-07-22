import { Injectable, inject } from '@angular/core';
import { Tender } from '../models/tender';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { FirebaseAuthService } from './firebaseauth.service';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, from, map } from 'rxjs';
import { TablodataService } from './tablodata.service';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  private tendersSubject = new BehaviorSubject<Tender[]>([]);
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

  
  createTender(isDraft=false) {
    let tender = this._currentTender.getValue();
    let currentTableData = this.tableData.currentData;
    let data: { [key: number]: any } = {};
    for (let i = 0; i < currentTableData.length; i++) {
      data[i] = currentTableData[i];
    }
    tender.discoveryData = data;
    tender.owner_id = this.authService.getUser()?.uid || '';
    tender.isDraft = isDraft;
    addDoc(this.tendersCollection, tender ).then((documentReference: DocumentReference) => {
      console.log(documentReference);
  });

  }

  updateTender(isDraft=false) {
    let tender = this._currentTender.getValue();
    let currentTableData = this.tableData.currentData;
    let data: { [key: number]: any } = {};
    for (let i = 0; i < currentTableData.length; i++) {
      data[i] = currentTableData[i];
    }
    tender.discoveryData = data;
    tender.owner_id = this.authService.getUser()?.uid || '';
    tender.isDraft = isDraft;
    // Obtain a reference to the specific tender document
    const tenderRef = doc(this.tendersCollection, tender.id);
  
    // Perform an update on the tender document with the provided data
    updateDoc(tenderRef, tender as object)
      .then(() => {
        console.log('Tender updated successfully!');
        // Optional: Handle success scenarios (e.g., emit an event, show a success message)
      })
      .catch((error) => {
        console.error('Error updating tender:', error);
        // Handle error scenarios (e.g., display an error message to the user)
      });
  }
  

  getTendersByOwnerId(isDraft=false) {
    const userId = this.authService.getUser()?.uid || '';
    const tendersQuery = query(this.tendersCollection, where('owner_id', '==', userId));

    onSnapshot(tendersQuery, (querySnapshot) => {
      const tenders: Tender[] = [];
      querySnapshot.forEach((doc) => {
        let tenderData = doc.data() as Tender;
        tenderData.id = doc.id;
        if(tenderData.isDraft===isDraft) {
          tenders.push(tenderData);
        }
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
          let tenderData =docSnapshot.data() as Tender;
          tenderData.id=docSnapshot.id;
          this._currentTender.next(tenderData);
          return tenderData;
        } else {
          return null;
        }
      })
    );
  }

  getTendersByBidderId(bidderId?: string): Observable<Tender[]> {
    if (!bidderId) {
      bidderId = this.authService.getUser()?.uid || ''; 
    }
  
    // Use `getDocs` instead of `collectionData`
    return from(getDocs(this.tendersCollection)).pipe(
      map((querySnapshot) => {
        const tenders: Tender[] = [];
        querySnapshot.forEach((doc) => {
          const tender = doc.data() as Tender;
          tender.id = doc.id;
          if (tender.bidders?.includes(bidderId)) {
            tenders.push(tender);
          }
        });
        this.tendersSubject.next(tenders)
        return tenders;
      })
    );
  }

  deleteTender(tenderId: string) {
    // Obtain a reference to the specific tender document
    const tenderRef = doc(this.tendersCollection, tenderId);
  
    // Delete the tender document
    deleteDoc(tenderRef)
      .then(() => {
        console.log('Tender deleted successfully!');
        // Optional: Handle success scenarios (e.g., emit an event, show a success message)
      })
      .catch((error) => {
        console.error('Error deleting tender:', error);
        // Handle error scenarios (e.g., display an error message to the user)
      });
  }
  

  setTender(tender:Tender) {
    this._currentTender.next(tender);
  }
  

}

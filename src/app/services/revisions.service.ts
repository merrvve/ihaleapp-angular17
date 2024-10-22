import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { TenderRevision } from '../models/tender';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/internal/operators/map';
import { BehaviorSubject } from 'rxjs';
import { DictToDataList } from '../utils/functions/DictToDataList';
import { TablodataService } from './tablodata.service';

@Injectable({
  providedIn: 'root'
})
export class RevisionsService {
  private firestore = inject(Firestore);
  private _currentRevision = new BehaviorSubject<TenderRevision|null>(null);
  currentRevision$ = this._currentRevision.asObservable();
  constructor(
    private tableDataService: TablodataService
  ) { }

  createRevision(tenderId: string, discovery_data: any,name: string) {
    const tenderRef = doc(this.firestore, 'tenders', tenderId);
    const revisionsRef = collection(tenderRef, 'revisions'); 
    const revision : TenderRevision = {
      created_at: new Date().toDateString(),
      discoveryData: discovery_data,
      name: name
    }
    return from(addDoc(revisionsRef, revision)).pipe(map((docRef) => {
      const createdRevision: TenderRevision = {
        ...revision,
        id: docRef.id // Include the document ID in the revision if your model supports it
      };

      // Assign the newly created revision to the BehaviorSubject
      this._currentRevision.next(createdRevision);
      const data= createdRevision.discoveryData;
      this.tableDataService.loadData(DictToDataList(data));
      // Return the created revision
      return createdRevision;
    }));
  }

  getRevision(tenderId: string, revisionId: string) {
    const revisionDocRef = doc(this.firestore, 'tenders', tenderId, 'revisions', revisionId);

    return from(getDoc(revisionDocRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          const revision = docSnap.data() as TenderRevision; 
          this._currentRevision.next(revision)
          const data= revision.discoveryData;
          this.tableDataService.loadData(DictToDataList(data));
          return revision;
        } else {
          return null; 
        }
      })
    );
  }

  getAllRevisions(tenderId: string) {
    const revisionsRef = collection(this.firestore, 'tenders', tenderId, 'revisions');
    
    return from(getDocs(revisionsRef)).pipe(
      map((querySnapshot) => {
        const revisions: TenderRevision[] = [];
        querySnapshot.forEach((doc) => {
          const rev = doc.data() as TenderRevision;
          rev.id = doc.id;
          revisions.push(rev); // Push each document data as TenderRevision
        });
        return revisions;
      })
    );
  }

  updateRevision(tenderId: string, revisionId: string, updatedData: Partial<TenderRevision>) {
    const revisionDocRef = doc(this.firestore, 'tenders', tenderId, 'revisions', revisionId);
    
    // Return an observable that performs the update operation
    return from(updateDoc(revisionDocRef, updatedData));
  }

  // Deletes a specific revision by its ID
  deleteRevision(tenderId: string, revisionId: string) {
    const revisionDocRef = doc(this.firestore, 'tenders', tenderId, 'revisions', revisionId);

    // Return an observable that performs the delete operation
    return from(deleteDoc(revisionDocRef));
  }
  getCurrentRevision() {
    const revision = this._currentRevision.getValue();
    if(revision?.discoveryData) {
      this.tableDataService.loadData(DictToDataList(revision.discoveryData));
    }
    return revision;
  }
}

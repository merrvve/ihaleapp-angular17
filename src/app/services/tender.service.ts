import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Tender } from '../models/tender';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  constructor(private afs: AngularFirestore) { }

  createTender(tender: Tender): Promise<unknown> {
    // Set additional properties if needed (e.g., created_at timestamp)
    //tender.created_at = Date.now();

    // Save tender to Firestore
    return this.afs.collection('tenders').add(tender);
  }
}

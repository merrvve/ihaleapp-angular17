import { inject, Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { from, map } from 'rxjs';
import { Qa } from '../models/qa';

@Injectable({
  providedIn: 'root'
})
export class QasService {
  private firestore = inject(Firestore);
  constructor() {}

  createqa(tenderId: string, qa: Qa) {
    const tenderRef = doc(this.firestore, 'tenders', tenderId);
    const qasRef = collection(tenderRef, 'qas'); 
    
    return from(addDoc(qasRef, qa)).pipe(map((docRef) => {
      const createdQa: Qa = {
        ...qa,
        id: docRef.id 
      };

      return createdQa;
    }));
  }

  getAllqas(tenderId: string) {
    const qasRef = collection(this.firestore, 'tenders', tenderId, 'qas');
    
    return from(getDocs(qasRef)).pipe(
      map((querySnapshot) => {
        const qas: Qa[] = [];
        querySnapshot.forEach((doc) => {
          const qa = doc.data() as Qa;
          qa.id = doc.id;
          qas.push(qa); 
        });
        return qas;
      })
    );
  }

  updateQa(tenderId: string, qaId: string, updatedData: Partial<Qa>) {
    const qaDocRef = doc(this.firestore, 'tenders', tenderId, 'qas', qaId);
    
    // Return an observable that performs the update operation
    return from(updateDoc(qaDocRef, updatedData));
  }

  // Deletes a specific qa by its ID
  deleteQa(tenderId: string, qaId: string) {
    const qaDocRef = doc(this.firestore, 'tenders', tenderId, 'qas', qaId);

    // Return an observable that performs the delete operation
    return from(deleteDoc(qaDocRef));
  }
}


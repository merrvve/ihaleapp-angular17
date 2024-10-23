import { inject, Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { from, map } from 'rxjs';
import { Meeting } from '../models/meeting';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  private firestore = inject(Firestore);
  constructor() {}


  createMeeting(tenderId: string, meeting: Meeting) {
    const tenderRef = doc(this.firestore, 'tenders', tenderId);
    const meetingsRef = collection(tenderRef, 'meetings'); 
    
    return from(addDoc(meetingsRef, meeting)).pipe(map((docRef) => {
      const createdMeeting: Meeting = {
        ...meeting,
        id: docRef.id 
      };

      return createdMeeting;
    }));
  }

  getAllmeetings(tenderId: string) {
    const meetingsRef = collection(this.firestore, 'tenders', tenderId, 'meetings');
    
    return from(getDocs(meetingsRef)).pipe(
      map((querySnapshot) => {
        const meetings: Meeting[] = [];
        querySnapshot.forEach((doc) => {
          const meeting = doc.data() as Meeting;
          meeting.id = doc.id;
          meetings.push(meeting); 
        });
        return meetings;
      })
    );
  }

  updateMeeting(tenderId: string, meetingId: string, updatedData: Partial<Meeting>) {
    const meetingDocRef = doc(this.firestore, 'tenders', tenderId, 'meetings', meetingId);
    
    // Return an observable that performs the update operation
    return from(updateDoc(meetingDocRef, updatedData));
  }

  // Deletes a specific meeting by its ID
  deletemeeting(tenderId: string, meetingId: string) {
    const meetingDocRef = doc(this.firestore, 'tenders', tenderId, 'meetings', meetingId);    
    return from(deleteDoc(meetingDocRef));
  }
}

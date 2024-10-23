import { inject, Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, from, map } from 'rxjs';
import { Meeting } from '../models/meeting';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  _meetings = new BehaviorSubject<Meeting[]>([])
  meetings$ = this._meetings.asObservable();
  private firestore = inject(Firestore);

  constructor() {}


  createMeeting(tenderId: string, meeting: Meeting) {
    const tenderRef = doc(this.firestore, 'tenders', tenderId);
    const meetingsRef = collection(tenderRef, 'meetings'); 
    if(!meeting.ownerId) {
      meeting.ownerId = null;
    }
    return from(addDoc(meetingsRef, meeting)).pipe(map((docRef) => {
      const createdMeeting: Meeting = {
        ...meeting,
        id: docRef.id 
      };
      this.addMeeting(createdMeeting);
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
        this._meetings.next(meetings);
        return meetings;
      })
      
    );
  }

  updateMeeting(tenderId: string, meetingId: string, updatedData: Partial<Meeting>) {
    const meetingDocRef = doc(this.firestore, 'tenders', tenderId, 'meetings', meetingId);
    const currentMeetings = this._meetings.getValue();
  
    // Return an observable that performs the update operation
    return from(updateDoc(meetingDocRef, updatedData));
  }

  // Deletes a specific meeting by its ID
  deletemeeting(tenderId: string, meetingId: string) {
    const meetingDocRef = doc(this.firestore, 'tenders', tenderId, 'meetings', meetingId);  
    let currentMeetings = this._meetings.getValue().filter(x=> x.id!==meetingId);
    this._meetings.next(currentMeetings);  
    return from(deleteDoc(meetingDocRef));
  }

  addMeeting(newMeeting: Meeting) {
    const currentMeetings = this._meetings.getValue();
    this._meetings.next([...currentMeetings, newMeeting]);
  }
}

import { inject, Injectable } from '@angular/core';
import { collection, CollectionReference, doc, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import { ReportSettings } from '../models/report-settings';

@Injectable({
  providedIn: 'root'
})
export class ReportSettingService {
  private firestore = inject(Firestore);

  
  tendersCollection!: CollectionReference;
  currentSetting!: ReportSettings;
  constructor() {
    this.tendersCollection = collection(this.firestore, 'tenders');
  }

  updateReportSetting(tenderid: string, reportSetting: ReportSettings) {
    const tenderRef = doc(this.tendersCollection, tenderid);
    this.currentSetting = reportSetting;
   
    // Perform an update on specific fields of the tender document
    updateDoc(tenderRef, {
      reportSetting: reportSetting
    })
      .then(() => {
        console.log('Tender report setting updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating tender report setting:', error);
      });
  }
 
}

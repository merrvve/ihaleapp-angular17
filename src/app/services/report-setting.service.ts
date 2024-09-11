import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, doc, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import { ReportSettings } from '../models/report-settings';

@Injectable({
  providedIn: 'root'
})
export class ReportSettingService {
  private firestore = inject(Firestore);
  reportSettingsCollection!: CollectionReference;

  currentSetting!: ReportSettings;
  constructor() {
    this.reportSettingsCollection = collection(this.firestore, 'reportSettings');
  }

  createReportSettings(reportSetting: ReportSettings) {
    this.currentSetting = reportSetting;
    addDoc(this.reportSettingsCollection, reportSetting).then(
      (documentReference: DocumentReference) => {
        console.log(documentReference);
      },
    );
  }

  updateBudget(reportSetting: ReportSettings) {
    this.currentSetting = reportSetting;
    const reportSettingRef = doc(this.reportSettingsCollection, reportSetting.id);

    updateDoc(reportSettingRef, reportSetting as object)
      .then(() => {
        console.log('Tender updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating tender:', error);
      });
  }
  
  
}

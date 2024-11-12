import { inject, Injectable } from '@angular/core';
import { collection, CollectionReference, doc, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import { ReportSettings } from '../models/report-settings';
import { MessagesService } from './messages.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReportSettingService {
  private firestore = inject(Firestore);

  
  tendersCollection!: CollectionReference;
  currentSetting!: ReportSettings;
  constructor(
    private messagesService: MessagesService,
    private location: Location
  ) {
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
        this.messagesService.showSuccess("Rapor ayarları başarıyla güncellendi.");
        this.location.back();
      })
      .catch((error) => {
        this.messagesService.showError("Rapor ayarları güncellenemedi. "+ error.message)
      });
  }
 
}

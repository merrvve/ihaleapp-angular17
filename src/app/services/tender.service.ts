import { Injectable, inject } from '@angular/core';
import { Tender } from '../models/tender';
import {
  CollectionReference,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { FirebaseAuthService } from './firebaseauth.service';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, from, map, of } from 'rxjs';
import { TablodataService } from './tablodata.service';
import { Budget } from '../models/budget';
import { BudgetService } from './budget.service';
import { RevisionsService } from './revisions.service';
import { ListToDict } from '../utils/functions/ListToDict';
import { MessageService } from 'primeng/api/messageservice';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TenderService {
  private tendersSubject = new BehaviorSubject<Tender[]>([]);
  _currentTender = new BehaviorSubject<Tender>({
    owner_id: '',
    name: '',
    description: '',
    created_at: Date.now().toString(),
    currency: 'TL',
    cost: 0,
    requestedDocuments: [],
    tenderFiles: [],
    bidders: [],
    isCompleted: false,
    isDraft: false,
    isEditMode: false,
    revisions: [],
    revisionsCount: 0,
    bidsCount: 0,
    questionsCount: 0,
    liscenseTime: 'Kalan Süre'
  });
  tenders$ = this.tendersSubject.asObservable();
  currentTender$ = this._currentTender.asObservable();

  private firestore = inject(Firestore);
  tendersCollection!: CollectionReference;

  constructor(
    private authService: FirebaseAuthService,
    private tableData: TablodataService,
    private budgetService: BudgetService,
    private revisionsService: RevisionsService,
    private messageService: MessagesService,
    private router: Router
    
  ) {
    this.tendersCollection = collection(this.firestore, 'tenders');
  }

  createTender(isDraft = false) {
    const tender = this._currentTender.getValue();
    const owner_id = this.authService.getUser()?.uid;
    if(!owner_id) {
      this.messageService.showError("Kullanıcı girişi olmadan ihale oluşturulamaz.");
      return;
    }
    if(tender.name.length<1) {
      this.messageService.showError("Lütfen ihale adı bilgisini doldurunuz.");
      return;
    }
    if(tender.bidders.length<1) {
      this.messageService.showWarning("Bu ihaleye henüz teklifçi eklemediniz.");
    }

    
    const currentTableData = this.tableData.currentData;
    const data = ListToDict(currentTableData);
    
    tender.discoveryData = data;
    tender.owner_id = owner_id;
    tender.isDraft = isDraft;
    
    tender.bidsSummary = {
      maxPrices: {},
      minPrices: {},
      avgPrices: {}
    }
   
    tender.reportSetting = {
      baseValue: 'Minimum',
      showBaseValue: true,
      toBaseRatio: 10,
      toBaseRatioLow: 10,
      showHighPrice: true,
      showHighRatio: true,
      showLowPrice: true,
      showLowRatio: true,
      showAllTotal: true,
      showSubHeading: true,
      showAllRows: true,
      calculateSetting: 'allHeading'
    }
    
    addDoc(this.tendersCollection, tender).then(
      (documentReference: DocumentReference) => {
        console.log(documentReference);
        this.messageService.showSuccess(`${documentReference.id} nolu ihale başarıyla oluşturuldu.`);
        const budget : Budget = {
          name: 'default',
          tender_id: documentReference.id,
          discovery_data: data,
          revisionId: null,
          revisionName: "R1"
        }
        this.budgetService.createBudget(budget);
        this.router.navigate(['/ihale'])
      },
    );
  }

  updateTender(isDraft = false) {
    const tender = this._currentTender.getValue();
    const tenderRef = doc(this.tendersCollection, tender.id);
    const currentTableData = this.tableData.currentData;
    const data = ListToDict(currentTableData);
    const currentRevision = this.revisionsService.getCurrentRevision();
    if(currentRevision.id) {
      currentRevision.discoveryData = data;
      this.revisionsService.updateRevision(tender.id, currentRevision.id, currentRevision)
    }
    else {
      tender.discoveryData = data;
    }
    
    tender.owner_id = this.authService.getUser()?.uid || '';
    tender.isDraft = isDraft;
    // Obtain a reference to the specific tender document
    

    // Perform an update on the tender document with the provided data
    updateDoc(tenderRef, tender as object)
      .then(() => {
        this.messageService.showSuccess(`${tender.id} nolu ihale başarıyla güncellendi.`);
      })
      .catch((error) => {
        this.messageService.showError(`${tender.id} nolu ihale güncellenirken hata oluştu.` + error.message);
      });
  }

  getTendersByOwnerId(isDraft = false) {
    const userId = this.authService.getUser()?.uid || '';
    const tendersQuery = query(
      this.tendersCollection,
      where('owner_id', '==', userId),
    );

    onSnapshot(tendersQuery, (querySnapshot) => {
      const tenders: Tender[] = [];
      querySnapshot.forEach((doc) => {
        let tenderData = doc.data() as Tender;
        tenderData.id = doc.id;
        if (tenderData.isDraft === isDraft) {
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
          let tenderData = docSnapshot.data() as Tender;
          tenderData.id = docSnapshot.id;
          this._currentTender.next(tenderData);
          return tenderData;
        } else {
          return null;
        }
      }),
    );
  }

  getTendersByBidderId(bidderId?: string): Observable<Tender[]> {
    if (!bidderId) {
      bidderId = this.authService.getUser()?.uid 
      if(!bidderId) {
        return of([]);
      }   
    }

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
        this.tendersSubject.next(tenders);
        return tenders;
      }),
    );
  }

  deleteTender(tenderId: string) {
    // Obtain a reference to the specific tender document
    const tenderRef = doc(this.tendersCollection, tenderId);

    // Delete the tender document
    deleteDoc(tenderRef)
      .then(() => {
        this.messageService.showSuccess(`${tenderId} nolu ihale silindi.`);
      })
      .catch((error) => {
        this.messageService.showError(`${tenderId} nolu ihale silinirken hata oluştu.` + error.message);
      });
  }

  setTender(tender: Tender) {
    this._currentTender.next(tender);
  }
}

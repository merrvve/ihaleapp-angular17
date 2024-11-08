import { Injectable, inject } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, map, switchMap } from 'rxjs';
import { Tender, TenderRevision } from '../models/tender';
import { TablodataService } from './tablodata.service';
import { FirebaseAuthService } from './firebaseauth.service';
import { TenderBidsSummary } from '../models/tender-bids-summary';
import { RevisionsService } from './revisions.service';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class BidService {
  private firestore = inject(Firestore);

  tenderSubject = new BehaviorSubject<Tender | null>(null);
  tender$ = this.tenderSubject.asObservable();

  bidSubject = new BehaviorSubject<TenderBid>(null);
  bid$ = this.bidSubject.asObservable();

  bidsSubject = new BehaviorSubject<TenderBid[]>([]);
  bids$ = this.bidsSubject.asObservable();

  constructor(
    private tableService: TablodataService,
    private authService: FirebaseAuthService,
    private revisionService: RevisionsService,
    private messageService: MessagesService
  ) {}

  setBidData(tenderId?: string) {
    const currentData = this.bidSubject.getValue();
    const currentTableData = this.tableService.currentData;
    let data: { [key: number]: any } = {};
    for (let i = 0; i < currentTableData.length; i++) {
      data[i] = currentTableData[i];
    }
    const currentRevision: TenderRevision =
      this.revisionService.getCurrentRevision();

    if (!currentData?.isEditMode) {
      let bidData: TenderBid = {
        bidder_id: this.authService.currentUser.uid,
        created_at: new Date().toLocaleDateString('tr-TR'),
        tenderId: tenderId ? tenderId : null,
        revisionId:
          currentRevision && currentRevision.id ? currentRevision.id : null,
        revisionName:
          currentRevision && currentRevision.name ? currentRevision.name : 'R1',
        company_id: this.authService._userDetails.value?.companyId,
        company_name: this.authService._userDetails.value?.companyName,
        total_price: this.tableService.allTreeTotal,
        discovery_data: data,
      };
      this.bidSubject.next(bidData);
      return bidData;
    } else {
      currentData.discovery_data = data;
      currentData.revisionId =
        currentRevision && currentRevision.id ? currentRevision.id : null;
      currentData.revisionName =
        currentRevision && currentRevision.name ? currentRevision.name : 'R1';
      currentData.total_price = this.tableService.allTreeTotal;
      return currentData;
    }
  }

  createBid() {
    const tenderId = this.tenderSubject.value?.id;
    const bidData = this.setBidData(tenderId);
    if (tenderId) {
      const tenderRef = doc(this.firestore, 'tenders', tenderId);
      const bidsRef = collection(tenderRef, 'bids');
      // First, add the new bid
      return from(addDoc(bidsRef, bidData)).pipe(
        switchMap((docRef) => {
          // After adding the new bid, fetch all the bids including the new one
          return from(getDocs(bidsRef)).pipe(
            map((querySnapshot) => {
              // Transform Firestore documents into an array of bids
              const bids = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as TenderBid[];
              this.bidsSubject.next(bids)
              // Run the createBidsSummary function with the updated bids
              const summary = this.createBidsSummary(bids);
              if (summary) {
                this.updateBidsSummary(summary, tenderId);
              }
              updateDoc(tenderRef, {
                bidsCount: increment(1),
              })
                .then(() => {
                  console.log(
                    'Tender updated successfully! Bids count incremented.',
                  );
                })
                .catch((error) => {
                  console.error('Error updating tender:', error);
                });
              // Return the ID of the newly added bid
              return docRef.id;
            }),
          );
        }),
      );
      //  return from(addDoc(bidsRef, bidData)).pipe(map((docRef) => docRef.id));
    } else {
      return from([]);
    }
  }

  getBidsByBidderId(bidderId?: string): Observable<TenderBid[]> {
    if (!bidderId) {
      bidderId = this.authService.getUser()?.uid || '';
    }


    const tendersCollection = collection(this.firestore, 'tenders');
    const tendersQuery = query(tendersCollection); // Reference tenders collection

    return from(getDocs(tendersQuery)).pipe(
      map((querySnapshot) => {
        const bids: TenderBid[] = [];
        querySnapshot.forEach((tenderDoc) => {
          const tenderData = tenderDoc.data() as Tender;
         
          // Check if bidder ID matches (optional, based on your requirements)

          const tenderId = tenderDoc.id;
          const bidsRef = collection(tenderDoc.ref, 'bids'); // Reference bids subcollection

          // Use `getDocs` or `onSnapshot` (depending on your needs) to retrieve bids
          from(getDocs(bidsRef)).subscribe((bidsSnapshot) => {
            bidsSnapshot.forEach((bidDoc) => {
              const bid = bidDoc.data() as TenderBid;
              bid.id = bidDoc.id;
              bid.tenderId = tenderDoc.id;
              if (bid.bidder_id === bidderId) {
                bids.push(bid);
              }
            });
          });
        });
        this.bidsSubject.next(bids)
        return bids;
      }),
    );
  }

  getBidsByTenderId(tenderId: string): Observable<TenderBid[]> {
    const bidsRef = collection(this.firestore, 'tenders', tenderId, 'bids');
    const bidsQuery = query(bidsRef);
    return collectionData(bidsQuery, { idField: 'id' }) as Observable<
      TenderBid[]
    >;
  }

  updateBidsSummary(bidsSummary: TenderBidsSummary, tenderId: string) {
    const tendersCollection = collection(this.firestore, 'tenders');

    const tenderRef = doc(tendersCollection, tenderId);

    updateDoc(tenderRef, {
      bidsSummary: bidsSummary,
    })
      .then(() => {
        console.log('Tender bids Summary updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating tender bids summary:', error);
      });
  }

  createBidsSummary(bids: TenderBid[]): TenderBidsSummary | null {
    if (!bids || bids.length < 1) {
      return null;
    }

    const columns = bids[0].discovery_data['0']; // Assuming columns are the first row
    let minPrices: any = [];
    let maxPrices: any = [];
    let avgPrices: any = [];

    // Process each bid
    for (const bid of bids) {
      // Process each row in the discovery_data
      for (const [rowIndex, row] of Object.entries(bid.discovery_data)) {
        const rowNum = parseInt(rowIndex);

        // Initialize for this row if not already done
        if (!minPrices[rowNum]) {
          minPrices[rowNum] = {};
          maxPrices[rowNum] = {};
          avgPrices[rowNum] = {};
        }

        let priceSums: any = {};
        let priceCounts: any = {};

        // Process each column in the row
        columns.forEach((column: any, index: number) => {
          const value = row[index];

          if (value && typeof value === 'number') {
            // Initialize minPrices, maxPrices, priceSums, and priceCounts for this column if not done yet
            if (!minPrices[rowNum][column]) {
              minPrices[rowNum][column] = value;
              maxPrices[rowNum][column] = value;
              priceSums[column] = 0;
              priceCounts[column] = 0;
            }

            // Update minPrices and maxPrices for this row
            minPrices[rowNum][column] = Math.min(
              minPrices[rowNum][column],
              value,
            );
            maxPrices[rowNum][column] = Math.max(
              maxPrices[rowNum][column],
              value,
            );

            // Accumulate values for averages
            priceSums[column] += value;
            priceCounts[column] += 1;
          }
        });

        // Calculate the averages for this row
        columns.forEach((column: any) => {
          if (priceSums[column] && priceCounts[column]) {
            avgPrices[rowNum][column] = (
              priceSums[column] / priceCounts[column]
            ).toFixed(2);
          }
        });
      }
    }

    // Log the results for each row
    console.log('Min Prices by row:', minPrices);
    console.log('Max Prices by row:', maxPrices);
    console.log('Avg Prices by row:', avgPrices);

    // Return the result as a summary object
    return { minPrices, maxPrices, avgPrices };
  }

  async getBid(tenderId: string, bidId: string) {
    const bidsDocRef = doc(this.firestore, 'tenders', tenderId, 'bids', bidId);

    try {
      const docSnap = await getDoc(bidsDocRef);

      if (docSnap.exists()) {
        const bid = docSnap.data() as TenderBid;
        this.bidSubject.next(bid);
        //const data = bid.discovery_data;
        //this.tableDataService.loadData(DictToDataList(data));
        return bid;
      } else {
        return null; // Return null if the document doesn't exist
      }
    } catch (error) {
      console.error('Error fetching revision:', error);
      throw error; // Throw error for handling in caller function
    }
  }

  updateBid() {
    const tenderId = this.tenderSubject.getValue().id;
    const bidData = this.bidSubject.getValue();
    const bidDocRef = doc(
      this.firestore,
      'tenders',
      tenderId,
      'bids',
      bidData.id,
    );

    // Return an observable that performs the update operation
    return from(updateDoc(bidDocRef, bidData as { [x: string]: any }));
  }

  setCurrentBid(bid: TenderBid) {
    this.bidSubject.next(bid);
  }
  setCurrentTender(tender: Tender) {
    this.tenderSubject.next(tender);
  }

  deleteBid(bidId: string, tenderId: string) {
    if(tenderId) {
      const bidDocRef = doc(this.firestore, 'tenders', tenderId, 'bids', bidId);
      deleteDoc(bidDocRef).then( ()=> {
        this.messageService.showSuccess("Teklif başarıyla silindi");
        const updatedList = this.bidsSubject.getValue().filter(x=>x.id!==bidId);
        this.bidsSubject.next(updatedList)
        
      }
      )
      .catch((error)=> {
        this.messageService.showError("Teklif silinemedi. ", error);
      });
    }
    else {
      this.messageService.showError("Teklifle ilişkili ihale no bulunamadı");
    }
   
  }

  filterBidsByTenderId(tenderId: string) {
    const filteredBids = this.bidsSubject.getValue().filter(x=> x.tenderId===tenderId);
    this.bidsSubject.next(filteredBids);
  }
}

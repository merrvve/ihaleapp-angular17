import { Injectable, inject } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDocs,
  query,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, map, switchMap } from 'rxjs';
import { Tender } from '../models/tender';
import { TablodataService } from './tablodata.service';
import { FirebaseAuthService } from './firebaseauth.service';
import { TenderBidsSummary } from '../models/tender-bids-summary';

@Injectable({
  providedIn: 'root',
})
export class BidService {
  private firestore = inject(Firestore);

  tenderSubject = new BehaviorSubject<Tender | null>(null);
  tender$ = this.tenderSubject.asObservable();

  bidsSubject = new BehaviorSubject<TenderBid[] | null>(null);
  bids$ = this.bidsSubject.asObservable();

  constructor(
    private tableService: TablodataService,
    private authService: FirebaseAuthService,
  ) {}

  createBid() {
    const tenderId = this.tenderSubject.value?.id;

    const currentTableData = this.tableService.currentData;

    console.log(currentTableData);
    let data: { [key: number]: any } = {};
    for (let i = 0; i < currentTableData.length; i++) {
      data[i] = currentTableData[i];
    }
    let bidData: TenderBid = {
      bidder_id: this.authService.currentUser.uid,
      created_at: new Date().toDateString(),
      company_id: this.authService._userDetails.value?.companyId,
      company_name: this.authService._userDetails.value?.companyName,
      total_price: this.tableService.allTreeTotal,
      discovery_data: data,
    };
    if(tenderId) {
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
                          ...doc.data()
                      })) as TenderBid[];

                      // Run the createBidsSummary function with the updated bids
                      const summary = this.createBidsSummary(bids);
                      if(summary) {
                        this.updateBidsSummary(summary,tenderId);
                      }
                      // Return the ID of the newly added bid
                      return docRef.id;
                  })
              );
          })
      );
    //  return from(addDoc(bidsRef, bidData)).pipe(map((docRef) => docRef.id));
    }
    else {
      return from([])
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
              if (bid.bidder_id === bidderId) {
                bids.push(bid);
              }
            });
          });
        });
        this.bidsSubject.next(bids);
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
    console.log(bidsSummary,tenderId)
  }

  createBidsSummary(bids: TenderBid[]): TenderBidsSummary | null {
    if (!bids || bids.length < 1) {
        return null;
    }

    const columns = bids[0].discovery_data["0"]; // Assuming columns are the first row
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

                if (value && typeof value === "number") {
                    // Initialize minPrices, maxPrices, priceSums, and priceCounts for this column if not done yet
                    if (!minPrices[rowNum][column]) {
                        minPrices[rowNum][column] = value;
                        maxPrices[rowNum][column] = value;
                        priceSums[column] = 0;
                        priceCounts[column] = 0;
                    }

                    // Update minPrices and maxPrices for this row
                    minPrices[rowNum][column] = Math.min(minPrices[rowNum][column], value);
                    maxPrices[rowNum][column] = Math.max(maxPrices[rowNum][column], value);

                    // Accumulate values for averages
                    priceSums[column] += value;
                    priceCounts[column] += 1;
                }
            });

            // Calculate the averages for this row
            columns.forEach((column: any) => {
                if (priceSums[column] && priceCounts[column]) {
                    avgPrices[rowNum][column] = (priceSums[column] / priceCounts[column]).toFixed(2);
                }
            });
        }
    }

    // Log the results for each row
    console.log("Min Prices by row:", minPrices);
    console.log("Max Prices by row:", maxPrices);
    console.log("Avg Prices by row:", avgPrices);

    // Return the result as a summary object
    return { minPrices, maxPrices, avgPrices };
}

}

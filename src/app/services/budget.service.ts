import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Budget } from '../models/budget';
import { RevisionsService } from './revisions.service';
import { TenderRevision } from '../models/tender';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private firestore = inject(Firestore);
  private tenderData!: any[];
  private currentBudget!: Budget;

  budgetsCollection!: CollectionReference;

  constructor(
    private revisionService: RevisionsService
  ) {
    this.budgetsCollection = collection(this.firestore, 'budgets');
  }
  setTenderData(tenderData: any[]) {
    this.tenderData = tenderData;
  }

  setCurrentBudget(budget: Budget) {
    this.currentBudget = budget;
  }
  getCurrentBudget() {
    const currentRevision : TenderRevision = this.revisionService.getCurrentRevision();

    if (this.currentBudget) {
      return this.currentBudget;
    } else {
      let budget: Budget = {
        revisionId: currentRevision &&  currentRevision.id ? currentRevision.id : null,
        revisionName: currentRevision && currentRevision.name ? currentRevision.name : "R1",
        name: '',
        tender_id: '',
        discovery_data: this.tenderData,
      };
      return budget;
    }
  }

  async getBudgetsByTenderId(tenderid: string) {
    const budgetQuery = query(
      this.budgetsCollection,
      where('tender_id', '==', tenderid),
    );
    try {
      const querySnapshot = await getDocs(budgetQuery);
      let budgets: Budget[] = [];
      querySnapshot.forEach((doc) => {
        let budget = doc.data() as Budget;
        budget.id = doc.id;
        budgets.push(budget);
        this.currentBudget = budget;
      });
      return budgets;
    } catch (error) {
      console.log('Error getting documents: ', error);
      return null;
    }
  }

  createBudget(budget: Budget) {
    this.currentBudget = budget;
    addDoc(this.budgetsCollection, budget).then(
      (documentReference: DocumentReference) => {
        console.log(documentReference);
      },
    );
  }

  updateBudget(budget: Budget) {
    this.currentBudget = budget;
    const budgetRef = doc(this.budgetsCollection, budget.id);

    updateDoc(budgetRef, budget as object)
      .then(() => {
        console.log('Tender updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating tender:', error);
      });
  }
}

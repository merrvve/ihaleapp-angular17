import { inject, Injectable } from '@angular/core';
import { CompareTable } from '../models/compare-table';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentReference, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompareTablesService {
  private firestore = inject(Firestore); 
  
  tablesCollection!: CollectionReference;

  
  constructor() {
    this.tablesCollection = collection(this.firestore, 'compareTables')
  
  }
  
  async getTablesByTenderId(tenderid: string) {
    const tableQuery = query(this.tablesCollection, where('tenderId', '==', tenderid));
    try {
      const querySnapshot = await getDocs(tableQuery);
      let tables: CompareTable[] = [];
      querySnapshot.forEach((doc) => {
        let table = doc.data() as CompareTable;
        table.id = doc.id;
        tables.push(table);    
      });
      return tables;
    } catch (error) {
      console.log("Error getting documents: ", error);
      return null;
    }
  }

  createTable(compareTable: CompareTable) {
    console.log(compareTable, this.tablesCollection)
    addDoc(this.tablesCollection, compareTable ).then((documentReference: DocumentReference) => {
      console.log(documentReference);
  });
  }

  updateTable(compareTable: CompareTable) {
    const tableRef = doc(this.tablesCollection, compareTable.id);
  
    updateDoc(tableRef, compareTable as object)
    .then(() => {
      console.log('Tender updated successfully!');
    })
    .catch((error) => {
      console.error('Error updating tender:', error);
    });
  }

  deleteTable(tableid: string) {
    const tableRef = doc(this.tablesCollection,tableid);
  
    deleteDoc(tableRef)
      .then(() => {
        console.log('Table deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting table:', error);
      });
  }
}

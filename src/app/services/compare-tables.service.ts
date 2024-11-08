import { inject, Injectable } from '@angular/core';
import { CompareTable } from '../models/compare-table';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { MessagesService } from './messages.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CompareTablesService {
  private firestore = inject(Firestore);

  tablesCollection!: CollectionReference;

  constructor(
    private messagesService: MessagesService,
    private location: Location
  ) {
    this.tablesCollection = collection(this.firestore, 'compareTables');
  }

  async getTablesByTenderId(tenderid: string) {
    const tableQuery = query(
      this.tablesCollection,
      where('tenderId', '==', tenderid),
    );
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
      console.log('Error getting documents: ', error);
      return null;
    }
  }

  createTable(compareTable: CompareTable) {
    console.log(compareTable, this.tablesCollection);
    addDoc(this.tablesCollection, compareTable).then(
      () => {
        this.messagesService.showSuccess("Karşılaştırma tablosu kaydedildi.");
        this.location.back();
      },
    ).catch((error)=> this.messagesService.showError("Tablo kaydedilemedi. "+ error.message));
  }

  updateTable(compareTable: CompareTable) {
    const tableRef = doc(this.tablesCollection, compareTable.id);

    updateDoc(tableRef, compareTable as object)
      .then(() => {
        this.messagesService.showSuccess("Karşılaştırma tablosu güncellendi.");
        this.location.back();
      })
      .catch((error) => {
        this.messagesService.showError("Tablo güncellenemedi. "+ error.message);
      });
  }

  deleteTable(tableid: string) {
    const tableRef = doc(this.tablesCollection, tableid);

    deleteDoc(tableRef)
      .then(() => {
        this.messagesService.showSuccess("Karşılaştırma tablosu silindi.");
      })
      .catch((error) => {
        this.messagesService.showError("Tablo silinemedi. "+ error.message);
      });
  }
}

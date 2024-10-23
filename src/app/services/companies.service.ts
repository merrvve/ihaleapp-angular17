import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Company } from '../models/company.interface';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private firestore = inject(Firestore);
  companiesSubject = new BehaviorSubject<Company[]>([]);
  constructor() {}

  getCompanies() {
    const companiesQuery = query(collection(this.firestore, 'companies'));

    onSnapshot(companiesQuery, (querySnapshot) => {
      const companies: Company[] = [];
      querySnapshot.forEach((doc) => {
        let companyData = doc.data() as Company;
        companyData.id = doc.id;
        companies.push(companyData);
      });
      this.companiesSubject.next(companies);
    });
    return this.companiesSubject.asObservable();
  }

  getCompaniesByIdList(ids: string[]) {
    const companiesQuery = query(collection(this.firestore, 'companies'));

    onSnapshot(companiesQuery, (querySnapshot) => {
      const companies: Company[] = [];
      querySnapshot.forEach((doc) => {
        if(ids.includes(doc.id)) {
          let companyData = doc.data() as Company;
          companyData.id = doc.id;
          companies.push(companyData);
        }     
      });
      return companies;
    }); 
  }
}

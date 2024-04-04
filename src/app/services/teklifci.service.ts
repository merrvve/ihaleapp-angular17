import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FirmaYetkilisi } from '../models/firmayetkilisi.interface';

@Injectable({
  providedIn: 'root'
})
export class TeklifciService {
  private _yetkililerSubject = new BehaviorSubject<FirmaYetkilisi[]>([
    {id:'id1', firma:'firmaid1', yetkili_adi:'John',yetkili_soyadi:'Doe',telefon_numarasi:'123456789', email:'mail@mail.com' },
    {id:'id2', firma:'firmaid2', yetkili_adi:'Jane',yetkili_soyadi:'Birkin',telefon_numarasi:'123456789', email:'mail@mail.com' },
  ]);
  yetkililer$ = this._yetkililerSubject.asObservable();

  constructor() { }

  getYetkililer() {
    return this.yetkililer$;
  }

  addYetkili(yeniTeklifci: FirmaYetkilisi) {
    const currentList = this._yetkililerSubject.value; 
    const updatedList = [...currentList, yeniTeklifci]; 
    this._yetkililerSubject.next(updatedList); 
  }
}

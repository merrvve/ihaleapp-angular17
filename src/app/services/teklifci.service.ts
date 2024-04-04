import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FirmaYetkilisi } from '../models/firmayetkilisi.interface';
import { Firma } from '../models/firma.interface';

@Injectable({
  providedIn: 'root'
})
export class TeklifciService {
  private _yetkililerSubject = new BehaviorSubject<FirmaYetkilisi[]>([
    {id:'id1', firma:'firmaid1', yetkili_adi:'John',yetkili_soyadi:'Doe',telefon_numarasi:'123456789', email:'mail@mail.com' },
    {id:'id2', firma:'firmaid2', yetkili_adi:'Jane',yetkili_soyadi:'Birkin',telefon_numarasi:'123456789', email:'mail@mail.com' },
  ]);
  yetkililer$ = this._yetkililerSubject.asObservable();

  private _firmalarSubject = new BehaviorSubject<Firma[]>([
    {id:'id1',firma_no:'firma no', firma_adi:'firma 1', vergi_no:'örnek vergi no', islem_kategorisi:'örnek kategori'  },
    {id:'id2', firma_no:'firma no', firma_adi:'firma 2', vergi_no:'örnek vergi no', islem_kategorisi:'örnek kategori'},
  ]);
  firmalar$ = this._firmalarSubject.asObservable();

  constructor() { }

  getYetkililer() {
    return this.yetkililer$;
  }

  getFirmalar() {
    return this.firmalar$;
  }

  addYetkili(yeniTeklifci: FirmaYetkilisi) {
    const currentList = this._yetkililerSubject.value; 
    const updatedList = [...currentList, yeniTeklifci]; 
    this._yetkililerSubject.next(updatedList); 
  }
}

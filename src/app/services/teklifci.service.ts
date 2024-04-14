import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FirmaYetkilisi } from '../models/firmayetkilisi.interface';
import { Firma } from '../models/firma.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeklifciService {
  private _yetkililerSubject = new BehaviorSubject<FirmaYetkilisi[]>([
    {id:1, firma:1, yetkili_adi:'John',yetkili_soyadi:'Doe',telefon_numarasi:'123456789', email:'mail@mail.com' },
    {id:2, firma:2, yetkili_adi:'Jane',yetkili_soyadi:'Birkin',telefon_numarasi:'123456789', email:'mail@mail.com' },
  ]);
  yetkililer$ = this._yetkililerSubject.asObservable();

  private _firmalarSubject = new BehaviorSubject<Firma[]>([
    {id:1, firma_adi:'firma 1', vergi_no:'örnek vergi no', islem_kategorisi:'örnek kategori'  },
    {id:2, firma_adi:'firma 2', vergi_no:'örnek vergi no', islem_kategorisi:'örnek kategori'},
  ]);
  firmalar$ = this._firmalarSubject.asObservable();

  constructor(private http: HttpClient) { }

  getYetkililer() {
    return this.http.get<FirmaYetkilisi[]>(environment.apiUrl+"/ihale/yetkililer");
  }

  getFirmalar() {
    return this.http.get<Firma[]>(environment.apiUrl+"/ihale/firmalar");
  }

  createFirma(firma: Firma) {
    return this.http.post<Firma>(environment.apiUrl+'/ihale/firma-ekle',firma);
  }

  createFirmaYetkilisiAndFirma(firma: Firma, yetkili:FirmaYetkilisi) {
    return this.http.post<any>(environment.apiUrl+'/ihale/firma-ve-yetkili-ekle',{firma_data:firma, yetkilisi_data:yetkili});
  }
  createFirmaYetkilisiToFirma( yetkili:FirmaYetkilisi) {
    return this.http.post<FirmaYetkilisi>(environment.apiUrl+'/ihale/firmaya-yetkili-ekle',yetkili)
  }

  addYetkili(yeniTeklifci: FirmaYetkilisi) {
    const currentList = this._yetkililerSubject.value; 
    const updatedList = [...currentList, yeniTeklifci]; 
    this._yetkililerSubject.next(updatedList); 
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FirmaYetkilisi } from '../models/firmayetkilisi.interface';
import { Firma } from '../models/firma.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Ihale } from '../models/ihale.interface';
import { Teklif } from '../models/teklif.interface';

@Injectable({
  providedIn: 'root',
})
export class TeklifciService {
  
  teklif : Teklif = {
    ihale: -1,
    yetkili: 0,
    teklif_tarihi: '',
    teklif_dokumanlari: '',
    kesif: [],
    toplam_bedel: 0
  }

  ihale! : Ihale;
  
  constructor(private http: HttpClient) {}

  getYetkililer() {
    return this.http.get<FirmaYetkilisi[]>(
      environment.apiUrl + '/ihale/yetkililer',
    );
  }

  getFirmalar() {
    return this.http.get<Firma[]>(environment.apiUrl + '/ihale/firmalar');
  }

  createFirma(firma: Firma) {
    return this.http.post<Firma>(
      environment.apiUrl + '/ihale/firma-ekle',
      firma,
    );
  }

  createFirmaYetkilisiAndFirma(firma: Firma, yetkili: FirmaYetkilisi) {
    return this.http.post<any>(
      environment.apiUrl + '/ihale/firma-ve-yetkili-ekle',
      { firma_data: firma, yetkilisi_data: yetkili },
    );
  }
  createFirmaYetkilisiToFirma(yetkili: FirmaYetkilisi) {
    return this.http.post<FirmaYetkilisi>(
      environment.apiUrl + '/ihale/firmaya-yetkili-ekle',
      yetkili,
    );
  }

  
  getTeklifciIhaleleri() {
    return this.http.get<Ihale[]>(
      environment.apiUrl + '/ihale/teklif-verebilecegim-ihaleler'
    ); 
  }

  getTeklifciTeklifleri() {
    return this.http.get<Teklif[]>(
      environment.apiUrl + '/ihale/tekliflerim'
    ); 
  }

  getIhaleDetail(id: number) {
    return this.http.get<Ihale>(
      environment.apiUrl + '/ihale/ihale/' + id
    );    
  }


}

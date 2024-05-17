import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FirmaYetkilisi } from '../models/firmayetkilisi.interface';
import { Firma } from '../models/firma.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Ihale } from '../models/ihale.interface';
import { Teklif } from '../models/teklif.interface';
import { TablodataService } from './tablodata.service';

@Injectable({
  providedIn: 'root',
})
export class TeklifciService {
  
  teklif : Teklif = {
    ihale: -1,
    teklif_dokumanlari_listesi: '',
    kesif: [],
    toplam_bedel: 0,
    teklif_notlari: ''
  }
  files: File[] = [];
  tabloData: any[][] = [];

  ihale! : Ihale;
  
  constructor(private http: HttpClient,
    private tableService: TablodataService
  ) {}

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

  createTeklif() {
    if(this.ihale.id) {
      this.teklif.ihale = this.ihale.id
    }
    this.teklif.kesif = this.tableService.currentData;
    return this.http.post<Teklif>(
      environment.apiUrl + '/ihale/teklif', this.teklif
    );  
  }


  getFileFormData() {
    const formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append(String(i), this.files[i], this.files[i].name);
    }

    return formData;
  }

  uploadFile(formData: FormData, teklif_id: number) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<any>(
      environment.apiUrl +
        '/ihale/teklif/dosya-yukle/' +
        teklif_id +
        '/' +
        this.files.length,
      formData,
      { headers: headers },
    );
  }


}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Ihale } from '../models/ihale.interface';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TalepEdilenEvrak } from '../models/talepedilenevrak.interface';

@Injectable({
  providedIn: 'root'
})
export class IhaleService {
  private _ihaleSubject = new BehaviorSubject<Ihale>(
    {id:'',olusturan:'', 
    ihale_aciklamasi:'', baslangic_tarihi:'', bitis_tarihi:'', 
    isCompleted: false, isTaslak: false, kesif: [],
    para_birimi:'', durum:'Devam ediyor', 
    ihale_bedeli:0,ihale_dokumanlari:'',istenen_dokumanlar:'', teklifciler:[]}
  );

  evraklar : TalepEdilenEvrak[] = [];
  ihale$ = this._ihaleSubject.asObservable();

  files : File[] = [];
  constructor(private http: HttpClient) { }
  getIhaleler() {
    return this.http.get<Ihale[]>(environment.apiUrl+"/ihale/ihalelerim");
  }

  istenenDokumanlarEkle(docs: string) {
    this._ihaleSubject.value.istenen_dokumanlar=docs;
  }
  
}

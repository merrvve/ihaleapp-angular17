import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Ihale } from '../models/ihale.interface';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TalepEdilenEvrak } from '../models/talepedilenevrak.interface';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IhaleService {
  private _ihaleSubject = new BehaviorSubject<Ihale>(
    {id:'', 
    ihale_aciklamasi:'', baslangic_tarihi:'', bitis_tarihi:'', 
    isCompleted: false, isTaslak: false, kesif: [],
    para_birimi:'', 
    ihale_bedeli:0,istenen_dokumanlar:'', teklifciler:[]}
  );

  evraklar : TalepEdilenEvrak[] = [];
  ihale$ = this._ihaleSubject.asObservable();

  files : File[] = [];
  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  getIhaleler() {
    return this.http.get<Ihale[]>(environment.apiUrl+"/ihale/ihalelerim");
  }

  createIhale() {
    const ihale: Ihale = this._ihaleSubject.value;
    console.log(ihale)
    ihale.baslangic_tarihi = this.datePipe.transform(ihale.baslangic_tarihi,"yyyy-MM-dd") || "";
    ihale.bitis_tarihi = this.datePipe.transform(ihale.bitis_tarihi,"yyyy-MM-dd") || "";
    return this.http.post<any>(environment.apiUrl+'/ihale/ihale',ihale);
  }

  istenenDokumanlarEkle(docs: string) {
    this._ihaleSubject.value.istenen_dokumanlar=docs;
  }

  teklifcilerEkle(teklifciler: string[]) {
    this._ihaleSubject.value.teklifciler = teklifciler;
  }
  
}

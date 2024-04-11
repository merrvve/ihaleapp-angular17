import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Ihale } from '../models/ihale.interface';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IhaleService {
  private _ihaleSubject = new BehaviorSubject<Ihale>(
    {id:'',olusturan:'', 
    ihale_aciklamasi:'', baslangic_tarihi:'', 
    isCompleted: false, isTaslak: false, kesif: [],
    para_birimi:'', durum:'Devam ediyor', 
    ihale_bedeli:0,ihale_dokumanlari:'',istenen_dokumanlar:'', teklifciler:[]}
  );
  ihale$ = this._ihaleSubject.asObservable();

  constructor(private http: HttpClient) { }
  getIhaleler() {
    return this.http.get<Ihale[]>(environment.apiUrl+"/ihale/ihalelerim");
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Ihale } from '../models/ihale.interface';


@Injectable({
  providedIn: 'root'
})
export class IhaleService {
  private _ihalelerSubject = new BehaviorSubject<Ihale[]>([
    {id:'id1',olusturan:'kullanıcı', ihale_aciklamasi:'İhale açıklaması', baslangic_tarihi:'tarih', para_birimi:'TL', durum:'Devam ediyor', ihale_bedeli:20000,ihale_dokumanlari:'',istenen_dokumanlar:'', teklifciler:[]}
  ]);
  ihaleler$ = this._ihalelerSubject.asObservable();

  constructor() { }
  getIhaleler() {
    return this.ihaleler$;
  }
}

import { Injectable } from '@angular/core';
import { CurrencyRate } from '../models/currency-rate';
import { HttpBackend, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'http://hasanadiguzel.com.tr/api/kurgetir';

  constructor(private handler: HttpBackend) {}
  
  getCurrencyRates() {
    //const req = new HttpRequest('GET', this.apiUrl);
    // const req = new HttpRequest('GET', this.apiUrl, {
      
    //   mode: 'no-cors'
    // });
    // this.handler.handle(req).subscribe(result=>console.log(result))
    //fetch('http://hasanadiguzel.com.tr/api/kurgetir', {mode:'no-cors'}).then(response =>{ response.json(); console.log(response)})
    const currencyRate : CurrencyRate = {
      dolar: 33.22,
      euro: 36.22
    }
    return currencyRate;
  }
}

import { Injectable } from '@angular/core';
import { CurrencyRate } from '../models/currency-rate';
import {
  HttpBackend,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private currencyKey = environment.freeapi;
  private apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${this.currencyKey}&currencies=EUR%2CUSD&base_currency=TRY`;

  constructor(private handler: HttpBackend) {}

  getCurrencyRates() {
    const req = new HttpRequest('GET', this.apiUrl, {
      mode: 'no-cors',
    });

    // this.handler.handle(req).subscribe({
    //   next: (event) => {
    //     if (event.type === HttpEventType.Response) {
    //       const response = event as HttpResponse<any>;
    //       if (response.status === 200) {
    //         const body = response.body;
    //         console.log('Parsed result:', body.data);
    //       }
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Request failed with error:', err);
    //   }
    // });

    const currencyRate: CurrencyRate = {
      dolar: 33.22,
      euro: 36.22,
    };
    return currencyRate;
  }
}

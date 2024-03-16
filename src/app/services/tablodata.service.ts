import { Injectable } from '@angular/core';
import { Column } from '../models/column.interface';

@Injectable({
  providedIn: 'root'
})
export class TablodataService {
  public ornekData: string[][] = [
    ['Key', 'İş Tanımı', 'Marka', 'Birim', 'Miktar','Toplam'],
    ['1', 'Başlık', '', '','',''],
    ['1.1', 'x işi', 'Markası', 'metre','20000',''],
    ['1.2', '', '', '','',''],
    ['1.2.1', '', '', '','','']
  ];


  constructor() { }

  columns() {
    let cols : Column[] =[]
    let len = this.ornekData[0].length;
    for(let i=0; i<len; i++) {
      let editable = i ===0 ? false : true;
      let nf = i===len-1 ? true : false;
      cols.push({
        field: this.ornekData[0][i],
        header: this.ornekData[0][i],
        editable: editable,
        numberField: nf
      })
    }
    return cols;
  }
}

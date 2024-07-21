import { Injectable } from '@angular/core';
import { TenderBid } from '../models/tender-bid';

@Injectable({
  providedIn: 'root'
})
export class CompareBidsService {
  compareBids!: TenderBid[];
  constructor() { }
  createTableData(bids:TenderBid[]=[]) {
    let columns =['Poz No','İş Tanımı','Miktar','Birim'];
    let tableData = [];
    for (const key in bids[0].discovery_data) {
      if(key!=='0') {
        const row = bids[0].discovery_data[key];
        let newRow = [row[0], row[1], row[3], row[4],row[2],row[bids[0].discovery_data[key].length-1]];
        for(let i=1; i<bids.length; i++) {
          newRow.push(bids[i].discovery_data[key][2],row[bids[i].discovery_data[key].length-1])
        }
        tableData.push(newRow);
      }
      
  }
  
    for (const bid of bids) {
      if(bid.discovery_data[0].includes('Marka')) {
        columns.push(bid.company_name +' Marka')
      }
      if(bid.discovery_data[0].includes('Toplam Fiyat')) {
        columns.push(bid.company_name +' Toplam Fiyat')
      }
    }
    console.log(tableData)
    return { columns, tableData };
  }
}

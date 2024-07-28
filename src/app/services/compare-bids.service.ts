import { Injectable } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import { Tender } from '../models/tender';

@Injectable({
  providedIn: 'root'
})
export class CompareBidsService {
  compareBids!: TenderBid[];
  tender!: Tender;
  constructor() { }
  createTableData(bids:TenderBid[]=[]) {
    //set static column names of tender discovery data 
    let columns = ['key','İş Tanımı','Marka','Miktar','Birim']
    let tableData: any = [];
    let otherCols :string[]= [];
    bids.forEach((bid)=> {
      let data = this.convertToObject(bid.discovery_data,this.tender.discoveryData[0]);
      tableData.push(data);
    })
    console.log(tableData)
    for (const key in this.tender.discoveryData) {
      if(key!=='0') {
        const row = this.tender.discoveryData[key];
        
        for(let i=0; i<bids.length; i++) {
           for (const column of this.tender.discoveryData[0]) {
              if(!columns.includes(column)) {
                if(!otherCols.includes(column)) {
                  otherCols.push(column);
                }
                
                const newColName = `${bids[i].company_name} ${column}` +i;
                if(!columns.includes(newColName)) {
                  columns.push(newColName);
                }
                
              }
            }
        }
        
      }
      
  }
  const tenderData = this.convertToObject(this.tender.discoveryData, this.tender.discoveryData[0])
    console.log(otherCols)
     return { columns, otherCols, tableData, tenderData: tenderData };
  }

  convertToObject(data: any[],columns:string[]) {
    let newObjects: any[] = [];
    for(const key in data) {
      if(key!=="0") {
        let newObject : any = {}
        columns.forEach((column,index) => 
          {
          newObject[column]= data[key][index];
        });
        
        newObjects.push(newObject);
      } 
      
    }
    return newObjects; 
  }
}

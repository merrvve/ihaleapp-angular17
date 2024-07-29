import { Injectable } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import { Tender } from '../models/tender';
import { Column } from '../models/column.interface';

interface Price {
  title: string;
  bid: number;
  price: number;
}

interface CompareTableRow {
  id: string;
  key: string;
  title: string;
  amount: number;
  unit: string;
  brand: string;
  unitPrices: Price[];
  minUnitPrices: Price[];
  totalPrices: Price[];
}

@Injectable({
  providedIn: 'root'
})
export class CompareBidsService {
  compareBids!: TenderBid[];
  tender!: Tender;
  constructor() { }
  createTableData(bids:TenderBid[]=[]) {
    //set static column names of tender discovery data 
    let columns : Column[] = []; 
    let table : CompareTableRow[] = [];
    let tableData: any = [];
    //let otherCols :string[]= [];
    bids.forEach((bid)=> {
      let data = this.convertToObject(bid.discovery_data,this.tender.discoveryData[0]);
      tableData.push(data);
    })
    // for (const key in this.tender.discoveryData) {
    //   if(key!=='0') {
    //     const row = this.tender.discoveryData[key];
        
    //     for(let i=0; i<bids.length; i++) {
    //        for (const column of this.tender.discoveryData[0]) {
    //           if(!columns.includes(column)) {
    //             if(!otherCols.includes(column)) {
    //               otherCols.push(column);
    //             }
                
    //             const newColName = `${bids[i].company_name} ${column}` +i;
    //             if(!columns.includes(newColName)) {
    //               columns.push(newColName);
    //             }
                
    //           }
    //         }
    //     }
        
    //   }
      
    // }
  const tenderData = this.convertToObject(this.tender.discoveryData, this.tender.discoveryData[0])
  columns = this.convertToColumn(this.tender.discoveryData[0]);
  table = this.convertToCompareTable(columns,tenderData,tableData);
  const bidsCount = this.compareBids.length;
     return { columns, tenderData: tenderData, table: table, bidsCount };
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

  convertToCompareTable(columns: Column[], tenderObject: any[],  bidObjects: any[]) {
    let result : CompareTableRow[] = [];
    
    for(let i=0; i<tenderObject.length; i++) {
    // store prices for this row
      let unitPrices : Price[] =[];
      let totalPrices : Price[] = [];
      for(const column of columns) {
        if(column.isBirim) {
          bidObjects.forEach((bid,index) => 
            {
              unitPrices.push({title: column.header, bid: index, price: +bid[i][column.header] });       
            }
          ) 
        }
        else if(column.isToplam) {
          bidObjects.forEach((bid,index) => 
            {
              totalPrices.push({title: column.header, bid: index, price: +bid[i][column.header] });       
            }
          ) 
        }
      }
      let newRow : CompareTableRow =
          {
            id: '',
            key: tenderObject[i]['key'],
            title: tenderObject[i]['İş Tanımı'],
            amount: tenderObject[i]['Miktar'],
            unit: tenderObject[i]['Birim'],
            brand: tenderObject[i]['Marka'],
            unitPrices: unitPrices,
            minUnitPrices: [],
            totalPrices: totalPrices
          }
      console.log(newRow);
      result.push(newRow);
    }
    return result;

  }

  convertToColumn(columnNames: any) {
    
      let cols: Column[] = [];
      let len = columnNames.length;
      for (let i = 0; i < len; i++) {
        let editable = i === 0 ? false : true;
        let nf = false;
        let isToplam = columnNames[i].toLocaleLowerCase().includes('toplam');
        let isBirimToplam = columnNames[i].toLocaleLowerCase().includes('birim') && isToplam;
        let isBirim = columnNames[i].toLocaleLowerCase().includes('birim fiyat') && !isToplam;
        const isMiktar = columnNames[i].toLocaleLowerCase().includes('miktar');
        const isAllTotal = i===len-1 ? true : false;
        let relatedField=undefined;
        if (isBirim) {
          relatedField = columnNames[i].slice(0,-11) + "Toplam Fiyat";
          if(!columnNames.includes(relatedField)) {
            columnNames.push(relatedField);
          }
        }
        if (isMiktar || isToplam || isBirim) {
          nf = true;
        }
        editable = isToplam ? false : editable;
        
  
        cols.push({
          field: i===0 ? 'key' : columnNames[i],
          header: i===0 ? 'Poz No' : columnNames[i],
          editable: editable,
          numberField: nf,
          isBirim: isBirim,
          relatedField: relatedField,
          isBirimToplam: isBirimToplam,
          isToplam: isToplam,
          isMiktar: isMiktar,
          isAllTotal: isAllTotal
        });
      }
      return cols;
      
    
  }
}

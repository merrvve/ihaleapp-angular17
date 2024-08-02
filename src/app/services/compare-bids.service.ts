import { Injectable } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import { Tender } from '../models/tender';
import { Column } from '../models/column.interface';
import { average } from '@angular/fire/firestore';
import { CompareColumn } from '../models/compare-column.interface';

interface Price {
  title: string;
  bid: number;
  price: number;
  isMin?:boolean;
  isMax?:boolean;
}

interface MinMax {
  min: number;
  max: number;
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
interface BudgetObject {
  title:string;
  value: number;
}
@Injectable({
  providedIn: 'root'
})
export class CompareBidsService {
  compareBids!: TenderBid[];
  tender!: Tender;
  budget: TenderBid = {
    bidder_id: '0',
    created_at: '',
    total_price: 0,
    discovery_data: {
      "0": [
          "key",
          "İş Tanımı",
          "Marka",
          "Miktar",
          "Birim",
          "Malzeme Birim Fiyat",
          "İşçilik Birim Fiyat",
          "Toplam Birim Fiyat",
          "Malzeme Toplam Fiyat",
          "İşçilik Toplam Fiyat",
          "Toplam Fiyat"
      ],
      "1": [
          "1",
          "Başlık",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          60000
      ],
      "2": [
          "1.1",
          "zz",
          "zzz",
          50,
          "m",
          400,
          800,
          1200,
          20000,
          40000,
          60000
      ]
  }
  }

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
  const budgetObject = this.convertToObject(this.budget.discovery_data,this.tender.discoveryData[0])
  columns = this.convertToColumn(this.tender.discoveryData[0]);
  table = this.convertToCompareTable(columns,tenderData,tableData,budgetObject);
  const bidsCount = this.compareBids.length;
  this.loadBudget(this.compareBids[1],table,columns);
     return { columns, tenderData: tenderData, table: table, bidsCount, bids:this.compareBids };
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


  convertToCompareTable(columns: Column[], tenderObject: any[], bidObjects: any[], budgetData: any[]): CompareTableRow[] {
    let result: CompareTableRow[] = [];
    
    for (let i = 0; i < tenderObject.length; i++) {
      let unitPrices: Price[] = [];
      let totalPrices: Price[] = [];
      let budgetRow :any = {}
      for (const column of columns) {
        if (column.isBirim) {
          bidObjects.forEach((bid, index) => {
            unitPrices.push({ title: column.header, bid: index, price: +bid[i][column.header] });
          });
          budgetRow[column.header] =budgetData[i][column.header]
          
          //unitPrices.push({ title: column.header, bid: -1, price: budgetData[i][column.header]})
        } else if (column.isToplam) {
          bidObjects.forEach((bid, index) => {
            totalPrices.push({ title: column.header, bid: index, price: +bid[i][column.header] });
          });
          budgetRow[column.header] =budgetData[i][column.header]
          
          //totalPrices.push({ title: column.header, bid: -1, price: budgetData[i][column.header]});
        }
      }
  
      // Calculate min/max for unit and total prices
      const minMaxUnitP = this.calculateMinMax(unitPrices);
      const minMaxTotalP = this.calculateMinMax(totalPrices);
  
      // Mark isMin and isMax
      unitPrices.forEach(price => {
        const { min, max } = minMaxUnitP[price.title];
        price.isMin = price.price === min;
        price.isMax = price.price === max;
      });
  
      totalPrices.forEach(price => {
        const { min, max } = minMaxTotalP[price.title];
        price.isMin = price.price === min;
        price.isMax = price.price === max;
      });
  
      // Create the row object
      let anyRow: any = {
        id: '', // or some unique identifier
        key: tenderObject[i]['key'],
        'İş Tanımı': tenderObject[i]['İş Tanımı'],
        'Miktar': tenderObject[i]['Miktar'],
        'Birim': tenderObject[i]['Birim'],
        'Marka': tenderObject[i]['Marka'],
        unitPrices,
        totalPrices
      };
  
      // Add prices to the row
      unitPrices.forEach(price => {
        anyRow[price.title + (price.bid + 1)] = price.price;
      });
      totalPrices.forEach(price => {
        anyRow[price.title + (price.bid + 1)] = price.price;
      });
  
      // Add min and max values to the row
      for (const [title, { min, max, average }] of Object.entries(minMaxUnitP) as any) {
        anyRow[`${title} min`] = min;
        anyRow[`${title} max`] = max;
        anyRow[`${title} avg`] = average;
        anyRow[`${title} budget`] = budgetRow[title];

      }
      for (const [title, { min, max, average }] of Object.entries(minMaxTotalP) as any) {
        anyRow[`${title} min`] = min;
        anyRow[`${title} max`] = max;
        anyRow[`${title} avg`] = average;
        anyRow[`${title} budget`] = budgetRow[title];
      }
      
      result.push(anyRow);
    }
    console.log(result);
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

 calculateMinMax(prices: Price[]) {
    // Step 1: Group prices by title
    const groupedByTitle = prices.reduce((acc:any, { title, price }) => {
      if (!acc[title]) {
        acc[title] = [];
      }
      acc[title].push(price);
      return acc;
    }, {});
  
    // Step 2: Calculate min and max for each title
    const result :any = {};
    for (const [title, priceArray] of Object.entries(groupedByTitle)) {
      if (Array.isArray(priceArray) && priceArray.every(p => typeof p === 'number')) {
        const min = Math.min(...priceArray);
        const max = Math.max(...priceArray);
        const average = (priceArray.reduce((sum, price) => sum + price, 0) / priceArray.length).toFixed(2);
      result[title] = { min, max, average };
       
      } else {
        result[title] = { min: NaN, max: NaN, average:NaN }; // Handle cases where prices are not numbers
      }
    }
    return result;
  }

  loadBudget(budget: TenderBid,tableData: any[], columns: Column[]) {
    const budgetObject = this.convertToObject(budget.discovery_data,this.tender.discoveryData[0]);
    console.log(tableData)
    for(let i=0; i<tableData.length; i++) {
      for(const column of columns) {
        if(column.isBirim || column.isToplam) {
         console.log(budgetObject[i][column.header], tableData[i])
          tableData[i][column.header+ ' budget'] = budgetObject[i][column.header]
        }
      }
    }
    
  }
}

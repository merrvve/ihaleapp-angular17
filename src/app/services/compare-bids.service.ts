import { Injectable } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import { Tender } from '../models/tender';
import { Column } from '../models/column.interface';

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

  // convertToCompareTable(columns: Column[], tenderObject: any[],  bidObjects: any[]) {
  //   let result : any[] = [];
    
  //   for(let i=0; i<tenderObject.length; i++) {
  //   // store prices for this row
  //     let unitPrices : Price[] =[];
  //     let totalPrices : Price[] = [];
  //     for(const column of columns) {
  //       if(column.isBirim) {
  //         bidObjects.forEach((bid,index) => 
  //           {
  //             unitPrices.push({title: column.header, bid: index, price: +bid[i][column.header] });       
  //           }
  //         ) 
  //       }
  //       else if(column.isToplam) {
  //         bidObjects.forEach((bid,index) => 
  //           {
  //             totalPrices.push({title: column.header, bid: index, price: +bid[i][column.header] });       
  //           }
  //         ) 
  //       }
  //     }
  //     let anyRow : any =
  //         {
  //           id: '',
  //           'key': tenderObject[i]['key'],
  //           'İş Tanımı': tenderObject[i]['İş Tanımı'],
  //           'Miktar': tenderObject[i]['Miktar'],
  //           'Birim': tenderObject[i]['Birim'],
  //           'Marka': tenderObject[i]['Marka'],
  //         }
       
  //     unitPrices.forEach((price,i)=>{
  //       anyRow[price.title+(price.bid+1)] = price.price;
  //      })
  //      totalPrices.forEach((price,i)=>{
  //       anyRow[price.title+(price.bid+1)] = price.price;
  //      });

  //     const minMaxUnitP = this.calculateMinMax(unitPrices);
  //     const minMaxTotalP = this.calculateMinMax(totalPrices);
  //     for (const [title, { min, max }] of Object.entries(minMaxUnitP) as any) {
  //       anyRow[`${title} min`] = min;
  //       anyRow[`${title} max`] = max;
  //     }
  //     for (const [title, { min, max }] of Object.entries(minMaxTotalP) as any) {
  //       anyRow[`${title} min`] = min;
  //       anyRow[`${title} max`] = max;
  //     }
  //     result.push(anyRow);
  //   }
  //   console.log(result)
  //   return result;

  // }
  // convertToCompareTable(columns: Column[], tenderObject: any[], bidObjects: any[]): CompareTableRow[] {
  //   let result: CompareTableRow[] = [];
    
  //   for (let i = 0; i < tenderObject.length; i++) {
  //     let unitPrices: Price[] = [];
  //     let totalPrices: Price[] = [];
  //     let minUnitPrices: Price[] = []; // To store the min prices specifically
  
  //     for (const column of columns) {
  //       if (column.isBirim) {
  //         let pricesForColumn: Price[] = [];
  //         bidObjects.forEach((bid, index) => {
  //           pricesForColumn.push({ title: column.header, bid: index, price: +bid[i][column.header] });
  //         });
  
  //         // Determine min and max prices for this column
  //         const minPriceValue = Math.min(...pricesForColumn.map(p => p.price));
  //         const maxPriceValue = Math.max(...pricesForColumn.map(p => p.price));
  
  //         // Assign isMin and isMax properties
  //         pricesForColumn.forEach(price => {
  //           price.isMin = price.price === minPriceValue;
  //           price.isMax = price.price === maxPriceValue;
  //         });
  
  //         unitPrices.push(...pricesForColumn);
  //       } else if (column.isToplam) {
  //         let pricesForColumn: Price[] = [];
  //         bidObjects.forEach((bid, index) => {
  //           pricesForColumn.push({ title: column.header, bid: index, price: +bid[i][column.header] });
  //         });
  
  //         // Determine min and max prices for this column
  //         const minPriceValue = Math.min(...pricesForColumn.map(p => p.price));
  //         const maxPriceValue = Math.max(...pricesForColumn.map(p => p.price));
  
  //         // Assign isMin and isMax properties
  //         pricesForColumn.forEach(price => {
  //           price.isMin = price.price === minPriceValue;
  //           price.isMax = price.price === maxPriceValue;
  //         });
  
  //         totalPrices.push(...pricesForColumn);
  //       }
  //     }
  
  //     let anyRow: any = {
  //       id: '', // or some unique identifier
  //       key: tenderObject[i]['key'],
  //       title: tenderObject[i]['İş Tanımı'],
  //       amount: tenderObject[i]['Miktar'],
  //       unit: tenderObject[i]['Birim'],
  //       brand: tenderObject[i]['Marka'],
  //       unitPrices,
  //       totalPrices
  //     };
  
  //     // Populate row data with prices
  //     unitPrices.forEach((price) => {
  //       anyRow[price.title + (price.bid + 1)] = price.price;
  //     });
  //     totalPrices.forEach((price) => {
  //       anyRow[price.title + (price.bid + 1)] = price.price;
  //     });
  
  //     result.push(anyRow);
  //   }
  //   console.log(result)
  //   return result;
  // }
  convertToCompareTable(columns: Column[], tenderObject: any[], bidObjects: any[]): CompareTableRow[] {
    let result: CompareTableRow[] = [];
    
    for (let i = 0; i < tenderObject.length; i++) {
      let unitPrices: Price[] = [];
      let totalPrices: Price[] = [];
  
      for (const column of columns) {
        if (column.isBirim) {
          bidObjects.forEach((bid, index) => {
            unitPrices.push({ title: column.header, bid: index, price: +bid[i][column.header] });
          });
        } else if (column.isToplam) {
          bidObjects.forEach((bid, index) => {
            totalPrices.push({ title: column.header, bid: index, price: +bid[i][column.header] });
          });
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
      for (const [title, { min, max }] of Object.entries(minMaxUnitP) as any) {
        anyRow[`${title} min`] = min;
        anyRow[`${title} max`] = max;
      }
      for (const [title, { min, max }] of Object.entries(minMaxTotalP) as any) {
        anyRow[`${title} min`] = min;
        anyRow[`${title} max`] = max;
      }
  
      result.push(anyRow);
    }
    console.log(result)
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
        result[title] = { min, max };
      } else {
        result[title] = { min: NaN, max: NaN }; // Handle cases where prices are not numbers
      }
    }

    
  
    return result;
  }
}

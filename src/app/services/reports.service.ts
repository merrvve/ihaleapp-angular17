import { Injectable } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import { ReportSettings } from '../models/report-settings';
import { TenderBidsSummary } from '../models/tender-bids-summary';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReportStatement } from '../models/report-statement';



@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private _reportStatementsSubject = new BehaviorSubject<ReportStatement>({
    positiveStatements: [],
    negativeStatements: [],
    descriptionStatements: []
  });
  reportStatements$ = this._reportStatementsSubject.asObservable(); 

  constructor() {}

  ngOnInit() {
    
  }
  createReport(bid: TenderBid, reportSetting: ReportSettings, bidsSummary: TenderBidsSummary) {
    // console.log(bid,reportSetting,bidsSummary)
    this._reportStatementsSubject.next({
      positiveStatements: [],
      negativeStatements: [],
      descriptionStatements: []
    });
    let positiveStatements = [];
    let negativeStatements = [];
    let descriptionStatements = [`xxx İhalesi ${bid.company_name} Firması ${bid.id} no'lu Teklif Raporu`];
    if(!reportSetting) {
      return;
    }
    if(!bid ||!bid.discovery_data) {
      return;
    }
    if(!bidsSummary) {
      return;
    }
    let baseValue =[];
    
    switch(reportSetting.baseValue) {
      case 'Minimum':
        baseValue = bidsSummary.minPrices;
        break;
      case 'Ortalama':
        baseValue = bidsSummary.avgPrices;
        break;
      case 'Bütçe':
        break;
      default:
        break;
    }
    if(reportSetting.calculateSetting==="onlyTotal") {
      // datadan sadece totali al
    }
    if(reportSetting.showAllTotal) {
      // rapora genel toplam bilgisi
    }
    if(reportSetting.showSubHeading) {
      // Alt başlıkları ekle
    }
    if(reportSetting.showAllRows) {
      //tüm satırları ekle
    }

    const columns = bid.discovery_data["0"];
    
    Object.values(bid.discovery_data).forEach((row: any,index:number)=>{
      row.forEach((value:any,i:number)=> {
        if(typeof(value)==="number") {
          const cellBaseValue = +baseValue[index][columns[i]]
          console.log(cellBaseValue,reportSetting.toBaseRatio, (cellBaseValue*reportSetting.toBaseRatio/100)+cellBaseValue,value )
          if(columns[i]!=="Toplam Fiyat" && reportSetting.calculateSetting==="onlyTotal") {
              //skip this column
          }
          else {
            if(row[0].includes('.') && !reportSetting.showSubHeading) {
              //skip this.
            }
            if(!row[0].includes('.') && !reportSetting.showAllTotal) {
              // skip this
            }
            else {
              if(value>= (cellBaseValue*reportSetting.toBaseRatio/100)+cellBaseValue) {
                const baseValueStatement = reportSetting.showBaseValue ?  `tüm tekliflerin ${reportSetting.baseValue} fiyatından` : '';
                const statement = `${row[0]} poz nolu ${row[1]} iş kalemi ${columns[i]} için verdiğiniz teklif: ${value}, ${baseValueStatement} %${reportSetting.toBaseRatio} yüksektir.`;
                positiveStatements.push(statement)
              }
              if(value<= (cellBaseValue*reportSetting.toBaseRatioLow/100)-cellBaseValue) {
                const baseValueStatement = reportSetting.showBaseValue ?  `tüm tekliflerin ${reportSetting.baseValue} fiyatından` : '';
                const statement = `${row[0]} poz nolu ${row[1]} iş kalemi ${columns[i]} için verdiğiniz teklif: ${value}, ${baseValueStatement}  %${reportSetting.toBaseRatioLow} düşüktür.`;
                negativeStatements.push(statement)
              }
            }
            
          }
          
        }
      })
    });
    if(positiveStatements.length===0 && negativeStatements.length===0){
      descriptionStatements.push(`Seçilen teklifte, rapor ayarlarında seçilen baz değerin %${reportSetting.toBaseRatio} üstünde ve ya %${reportSetting.toBaseRatioLow} altında değer bulunmamaktadır.`)
    }
    this._reportStatementsSubject.next({positiveStatements,negativeStatements,descriptionStatements});
    
  }

  discoveryDataToDict(discovery_data: any[]) {
    return {}
  }

  generateReportDic(baseValue: any, toBaseRatio: number, data: any) {
    // for each row in data
    // for each column name in baseValue
    // if data[row][column].value > basValue[column] * toBaseRatio / 100
    // data[row][greater] 
    // if data[row][column].value < basValue[column] * negativeToBaseRatio / 100
    // data[row][smaller] =true
  }

  printOutReport() {
    
  }
}

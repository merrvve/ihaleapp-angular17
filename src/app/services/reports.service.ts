import { Injectable } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import { ReportSettings } from '../models/report-settings';
import { TenderBidsSummary } from '../models/tender-bids-summary';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private _reportStatementsSubject = new BehaviorSubject<string[]>([]);
  reportStatements$ = this._reportStatementsSubject.asObservable(); 

  constructor() {}

  ngOnInit() {
    this._reportStatementsSubject.next([])
  }
  createReport(bid: TenderBid, reportSetting: ReportSettings, bidsSummary: TenderBidsSummary) {
    // console.log(bid,reportSetting,bidsSummary)
    this._reportStatementsSubject.next([]);
    let reportStatements : any[] = [];
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
    const baseRatio = reportSetting.toBaseRatio;
    let data = this.discoveryDataToDict(bid.discovery_data);
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
          if(value>= (cellBaseValue*reportSetting.toBaseRatio/100)+cellBaseValue) {
            const statement = `${row[0]} poz nolu ${row[1]} iş kalemi ${columns[i]} in verdiğiniz teklif: ${value}, tüm tekliflerin ${reportSetting.baseValue} fiyaatından %${reportSetting.toBaseRatio} yüksektir.`;
            reportStatements.push(statement)
          }
          if(value<= (cellBaseValue*reportSetting.toBaseRatioLow/100)-cellBaseValue) {
            const statement = `${row[0]} poz nolu ${row[1]} iş kalemi ${columns[i]} in verdiğiniz teklif: ${value}, tüm tekliflerin ${reportSetting.baseValue} fiyaatından %${reportSetting.toBaseRatioLow} düşüktür.`;
            reportStatements.push(statement)
          }
        }
      })
    });
    if(reportStatements.length===0){
      reportStatements.push(`Seçilen teklifte, rapor ayarlarında seçilen baz değerin %${reportSetting.toBaseRatio} üstünde ve ya %${reportSetting.toBaseRatioLow} altında değer bulunmamaktadır.`)
    }
    this._reportStatementsSubject.next(reportStatements);
    
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

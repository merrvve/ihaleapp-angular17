import { Injectable } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import { ReportSettings } from '../models/report-settings';
import { TenderBidsSummary } from '../models/tender-bids-summary';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor() {}

  createReport(bid: TenderBid, reportSetting: ReportSettings, bidsSummary: TenderBidsSummary) {
    console.log(bid,reportSetting,bidsSummary)
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
    let baseValue: any;
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

    // Default true for each setting
    baseValue.forEach((value,index)=> {
      console.log(value,index)
    })
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

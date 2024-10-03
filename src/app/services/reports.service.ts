import { inject, Injectable } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import { ReportSettings } from '../models/report-settings';
import { TenderBidsSummary } from '../models/tender-bids-summary';
import { BehaviorSubject, from, map, Observable, of } from 'rxjs';
import { ReportStatement } from '../models/report-statement';
import { ReportTableCell } from '../models/report-table-cell';
import { ReportData } from '../models/report-data';
import { addDoc, collection, CollectionReference, Firestore, getDocs } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private firestore = inject(Firestore);
  reportsCollection!: CollectionReference;
  
  private _reportStatementsSubject = new BehaviorSubject<ReportStatement>({
    positiveStatements: [],
    negativeStatements: [],
    descriptionStatements: []
  });
  reportStatements$ = this._reportStatementsSubject.asObservable(); 

  private _reportTableData = new BehaviorSubject<Array<ReportTableCell[]>>([]);
  reportTableData$ = this._reportTableData.asObservable();
  
  private _currentReport = new BehaviorSubject<ReportData>(undefined)
  currentReport$ = this._currentReport.asObservable(); 
  
  constructor() {
    this.reportsCollection =collection(this.firestore, 'reports');
  }

  ngOnInit() {
    
  }
  createReport(bid: TenderBid, reportSetting: ReportSettings, bidsSummary: TenderBidsSummary, tenderId: string, tenderName: string) {
    this._currentReport.next({
      bid_id: bid.id,
      tender_id: tenderId,
      tender_name: tenderName,
      company_name: bid.company_name,
      reportSettings: reportSetting,
      bidsSummary: bidsSummary,
      isSent: false
    });

    this._reportStatementsSubject.next({
      positiveStatements: [],
      negativeStatements: [],
      descriptionStatements: []
    });

    this._reportTableData.next([]);

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
    let tableData =[];
    Object.values(bid.discovery_data).forEach((row: any,index:number)=>{
      let tableRows = []; 
      row.forEach((value:any,i:number)=> {
        let tableRow : ReportTableCell = {
          value: '',
          color: 'surface-50'
        }
        if(typeof(value)==="number") {
          
          const cellBaseValue = +baseValue[index][columns[i]]
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
                tableRow = {value, color:'bg-red-100', description: statement}
              }
              if(value<= (cellBaseValue*reportSetting.toBaseRatioLow/100)-cellBaseValue) {
                const baseValueStatement = reportSetting.showBaseValue ?  `tüm tekliflerin ${reportSetting.baseValue} fiyatından` : '';
                const statement = `${row[0]} poz nolu ${row[1]} iş kalemi ${columns[i]} için verdiğiniz teklif: ${value}, ${baseValueStatement}  %${reportSetting.toBaseRatioLow} düşüktür.`;
                negativeStatements.push(statement)
                tableRow = {value, color:'bg-blue-100', description:statement}
              }
            }
            
          }
          
        }
        else {
          tableRow = {value, color:'surface-50'};
        }
        tableRows.push(tableRow)
      })
      tableData.push(tableRows);
    });
    
    this._reportTableData.next(tableData);
    if(positiveStatements.length===0 && negativeStatements.length===0){
      descriptionStatements.push(`Seçilen teklifte, rapor ayarlarında seçilen baz değerin %${reportSetting.toBaseRatio} üstünde ve ya %${reportSetting.toBaseRatioLow} altında değer bulunmamaktadır.`)
    }
    this._reportStatementsSubject.next({positiveStatements,negativeStatements,descriptionStatements});
    
  }

  

  saveReport() {
    const report : ReportData = this._currentReport.getValue();
    if(report) {
      console.log(report);
    }
    addDoc(this.reportsCollection,report).then(()=>console.log("Report is created successfully"));
  }

  getReportsByTenderId(tenderId: string) {
    return from(getDocs(this.reportsCollection)).pipe(
      map((querySnapshot) => {
        const reports: ReportData[] = [];
        querySnapshot.forEach((doc) => {
          const report = doc.data() as ReportData;
          report.id = doc.id;
          if (report.tender_id===tenderId) {
            reports.push(report)
          }
        });
        return reports;
      }),
    );
  }
}

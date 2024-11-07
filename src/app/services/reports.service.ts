import { inject, Injectable } from '@angular/core';
import { TenderBid } from '../models/tender-bid';
import { ReportSettings } from '../models/report-settings';
import { TenderBidsSummary } from '../models/tender-bids-summary';
import { BehaviorSubject, from, map, Observable, of } from 'rxjs';
import { ReportStatement } from '../models/report-statement';
import { ReportTableCell } from '../models/report-table-cell';
import { ReportData } from '../models/report-data';
import { addDoc, collection, CollectionReference, deleteDoc, doc, Firestore, getDocs } from '@angular/fire/firestore';
import { BudgetService } from './budget.service';
import { Budget } from '../models/budget';
import { TenderService } from './tender.service';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';


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

  private _reports = new BehaviorSubject<ReportData[]>(undefined)
  reports$ = this._reports.asObservable(); 
  
  budget!: Budget;
  constructor(
    private budgetService: BudgetService,
    private messageService: MessagesService,
    private router: Router
    
  ) {
    this.reportsCollection =collection(this.firestore, 'reports');
  }

  ngOnInit() {
    
  }
  createReport(bid: TenderBid, reportSetting: ReportSettings, bidsSummary: TenderBidsSummary, tenderId: string, tenderName: string, budgetData: any) {
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
    let baseValue ={};
    
    switch(reportSetting.baseValue) {
      case 'Minimum':
        baseValue = bidsSummary.minPrices;
        break;
      case 'Ortalama':
        baseValue = bidsSummary.avgPrices;
        console.log(baseValue)
        break;
      case 'Bütçe':
        baseValue =budgetData;
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
          value: value,
          color: 'surface-50'
        }
        if(index!==0 && typeof(value)==="number") {
          const cellBaseValue = +baseValue[index][columns[i]]
          const cellBaseString = cellBaseValue.toLocaleString("de-DE",{minimumFractionDigits: 0,
            maximumFractionDigits: 2})
          const baseValueStatement = reportSetting.showBaseValue ?  `tüm tekliflerin ${reportSetting.baseValue} fiyatı olan ${cellBaseString}'dan;` : '';
          const ratio =(value/cellBaseValue).toLocaleString("de-DE",{minimumFractionDigits: 0,
            maximumFractionDigits: 2})
          const ratioStatement = `% ${ratio} daha`;
          const valueString = value.toLocaleString("de-DE",{minimumFractionDigits: 0,
            maximumFractionDigits: 2})
          if(columns[i]!=="Toplam Fiyat" && reportSetting.calculateSetting==="onlyTotal") {
           
              //skip this column
          }
          else {
            console.log(row[0], typeof(row[0]))
            if(row[0].toString().includes('.') && !reportSetting.showSubHeading) {
              
            }
            // if(!row[0].includes('.') && !reportSetting.showAllTotal) {
            //   // skip this
            // }
            else {
              if(!reportSetting.showAllTotal && row[1]?.toLowerCase().includes('Toplam')) {
                // skip this
               
              }
              if(!reportSetting.showAllRows && row[0].toString().includes('.')) {
                // skip this
                
              }
              else {
                if(reportSetting.showHighPrice && value> (cellBaseValue*reportSetting.toBaseRatio/100)+cellBaseValue) {
                  console.log(value,cellBaseValue, reportSetting.toBaseRatio,(cellBaseValue*reportSetting.toBaseRatio/100)+cellBaseValue)
                  const statement = `${row[0]} poz nolu ${row[1]} iş kalemi ${columns[i]} için verdiğiniz teklif: ${valueString}, ${baseValueStatement} ${ratioStatement} yüksektir.`;
                  positiveStatements.push(statement)
                  tableRow = {value, color:'bg-red-100', description: statement}
                }
                if(reportSetting.showLowPrice && value<= (cellBaseValue*reportSetting.toBaseRatioLow/100)-cellBaseValue) {
                  
                  const statement = `${row[0]} poz nolu ${row[1]} iş kalemi ${columns[i]} için verdiğiniz teklif: ${valueString}, ${baseValueStatement}  ${ratioStatement} düşüktür.`;
                  negativeStatements.push(statement)
                  tableRow = {value, color:'bg-blue-100', description:statement}
                }
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
      descriptionStatements.push(`Seçilen teklifte, rapor ayarlarında seçilen baz değerin (${reportSetting.baseValue}) %${reportSetting.toBaseRatio} üstünde ve ya %${reportSetting.toBaseRatioLow} altında değer bulunmamaktadır.`)
    }
    this._reportStatementsSubject.next({positiveStatements,negativeStatements,descriptionStatements});
    
  }

  

  saveReport() {
    const report : ReportData = this._currentReport.getValue();
    if(report) {
      addDoc(this.reportsCollection,report).then(()=>{
        this.messageService.showSuccess("Rapor başarıyla oluşturuldu.");
        this.router.navigate([`/ihale/ihale/${report.tender_id}/firma-raporlari`])
      })
      .catch((error)=>{
        this.messageService.showError("Rapor oluşturulamadı. " + error)
      });
    }
    
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
        this._reports.next(reports)
        return reports;
      }),
    );
  }

  deleteReport(reportId: string) {
    const reportRef = doc(this.reportsCollection, reportId)
    // Delete the tender document
    deleteDoc(reportRef)
      .then(() => {
        this.messageService.showSuccess(`${reportId} nolu rapor silindi.`);
        const deletedList = this._reports.getValue().filter(x=> x.id!==reportId);
        this._reports.next(deletedList);
      })
      .catch((error) => {
        this.messageService.showError(`${reportId} nolu rapor silinirken hata oluştu.` + error.message);
      });
  }

  async getBudget(tenderId: string): Promise<any> {
    try {
      const result = await this.budgetService.getBudgetsByTenderId(tenderId);
      
      const discovery_data = result[0].discovery_data;
      const columns = discovery_data["0"];
      let budgetPrices = {}
      for (const [rowIndex, row] of Object.entries(discovery_data)) {
        const rowNum = parseInt(rowIndex);
        if (!budgetPrices[rowNum]) {
          budgetPrices[rowNum] = {};
      }
        columns.forEach((column: any, index: number) => {
         
          const value = row[index];

          if (value && typeof value === "number") {
             budgetPrices[rowNum][column] = value;
            
          }
        });
      }
      return budgetPrices;
      
    } catch (error) {
      console.error('Error fetching budget:', error);
      return null; // Return null in case of error
    }
  }

  async fetchBudgetValue(tenderId: string): Promise<any> {
    let baseValue = await this.getBudget(tenderId); // Assign the result of getBudget to baseValue
    return baseValue; // Log or further use baseValue as needed
  }
      
    
    
  }



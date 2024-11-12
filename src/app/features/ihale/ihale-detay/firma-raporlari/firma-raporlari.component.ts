import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Tender } from '../../../../models/tender';
import { ActivatedRoute, Router } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { MenuService } from '../../../../services/menu.service';
import { AsyncPipe } from '@angular/common';
import { ReportsService } from '../../../../services/reports.service';
import { ReportData } from '../../../../models/report-data';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { BidService } from '../../../../services/bid.service';
import { BudgetService } from '../../../../services/budget.service';

@Component({
  selector: 'app-firma-raporlari',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule],
  templateUrl: './firma-raporlari.component.html',
  styleUrl: './firma-raporlari.component.scss',
})
export class FirmaRaporlariComponent {
  tenderId!: string | null;
  tender$!: Observable<Tender | null>;
  reports$!: Observable<ReportData[]>;
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService,
    private menuService: MenuService,
    private reportService: ReportsService,
    private bidService: BidService,
    private router: Router,
    private budgetService: BudgetService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.tenderId = params.get('id');
      if (this.tenderId) {
        this.tender$ = this.tenderService.currentTender$;
        this.menuService.setItems(this.tenderId);
        this.subscription = this.reportService.getReportsByTenderId(this.tenderId).subscribe(
          ()=> this.reports$ = this.reportService.reports$
        );
      }
    });
  }

  seeReportDetail (report: ReportData) {
    
    this.bidService.getBid(report.tender_id, report.bid_id).then((bid)=>{
      if(report.reportSettings.baseValue==="Bütçe") {
        this.budgetService.getBudgetsByTenderId(report.tender_id, bid.revisionName).then(
          (budgets)=> {
            const budget = budgets[0].discovery_data;
            this.reportService.createReport(bid, report.reportSettings, report.bidsSummary,report.tender_id, report.tender_name,budget,true);
            this.router.navigate([`ihale/ihale/${report.tender_id}/firma-raporlari/rapor-onizleme`]);
          }
          )
      }
      else {
        this.reportService.createReport(bid, report.reportSettings, report.bidsSummary,report.tender_id, report.tender_name,{},true);
        this.router.navigate([`ihale/ihale/${report.tender_id}/firma-raporlari/rapor-onizleme`]);
      }
      
    })

  }
  deleteReport(reportId: string) {
    this.reportService.deleteReport(reportId);
  }

  ngOnDestroy() {
    this.menuService.clearItems();
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

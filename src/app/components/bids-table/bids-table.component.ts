import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Observable } from 'rxjs';
import { TenderBid } from '../../models/tender-bid';
import { TablodataService } from '../../services/tablodata.service';
import { Router } from '@angular/router';
import { CompareBidsService } from '../../services/compare-bids.service';
import { TenderService } from '../../services/tender.service';
import { Tender } from '../../models/tender';
import { ReportsService } from '../../services/reports.service';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-bids-table',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingSpinnerComponent,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './bids-table.component.html',
  styleUrl: './bids-table.component.scss',
})
export class BidsTableComponent {
  @Input() bids$!: Observable<TenderBid[]>;
  @Input() compare!: boolean;
  @Input() tender!: Tender;

  selectedBid!: TenderBid;
  selectedBids!: TenderBid[];

  constructor(
    private tableService: TablodataService,
    private router: Router,
    private compareService: CompareBidsService,
    private tenderService: TenderService,
    private reportService: ReportsService,
    private budgetService: BudgetService
  ) {}

  getEventValue($event: any): string {
    return $event.target.value;
  }

  
  compareBids() {
    if (this.selectedBids) {
        let previousRev = null;
        let currentRev = "";
        
        for (let [index, bid] of this.selectedBids.entries()) {
            if (index === 0) {       
                previousRev = bid.revisionName ? bid.revisionName : "R1";
                console.log(previousRev, "index 0");
            } else {
                currentRev = bid.revisionName ? bid.revisionName : "R1";
                console.log(currentRev, "current rev");
                console.log(currentRev, previousRev);
                
                if (currentRev !== previousRev) {
                    window.alert("Karşılatırılacak tüm teklifler aynı revizyon numarasına ait olmalıdır!");
                    console.log(currentRev, previousRev);
                    return; // Exit the function completely
                }
                
                previousRev = currentRev;
            }
        }

        // Set values in compareService and navigate
        this.compareService.compareBids = this.selectedBids;
        this.compareService.tender = this.tenderService._currentTender.getValue();
        this.router.navigate(['/ihale/karsilastir']);
    }
}


  

  onCreateReports(bids: TenderBid[]) {
    if(!bids) {
      console.log("No selected bids");
      return;
    }
    if(this.tender) {
      this.budgetService.getBudgetsByTenderId(this.tender.id,bids[0].revisionName).then(
        (budgets)=> {
          const budget = budgets[0].discovery_data;
          for (const bid of bids) {
            this.reportService.createReport(bid, this.tender.reportSetting, this.tender.bidsSummary, this.tender.id, this.tender.name,budget);
            this.router.navigate([`ihale/ihale/${this.tender.id}/firma-raporlari/rapor-onizleme`])
          }
        }
      )
      
    }
    else {
      console.log("No selected tender")
    }
  }

  seeTenderBidDetails(bid: TenderBid) {
    this.router.navigate([`ihale/ihale/${bid.tenderId}/teklifler/${bid.id}`]);
    
  }
}

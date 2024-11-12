import { Component } from '@angular/core';
import { TenderService } from '../../../../services/tender.service';
import { Tender } from '../../../../models/tender';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BidService } from '../../../../services/bid.service';
import { TenderBid } from '../../../../models/tender-bid';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TablodataService } from '../../../../services/tablodata.service';
import { CompareBidsService } from '../../../../services/compare-bids.service';
import { MenuService } from '../../../../services/menu.service';
import { BidsTableComponent } from '../../../../components/bids-table/bids-table.component';

@Component({
  selector: 'app-ihale-teklifleri',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,

    BidsTableComponent,
  ],
  templateUrl: './ihale-teklifleri.component.html',
  styleUrl: './ihale-teklifleri.component.scss',
})
export class IhaleTeklifleriComponent {
  currentTender!: Tender | null;
  bids$!: Observable<TenderBid[]>;
  selectedBids!: TenderBid[];
  paramSubscription!: Subscription;
  bidSubscription!: Subscription;
  compare = true;

  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService,
    private tableService: TablodataService,
    private router: Router,
    private bidService: BidService,
    private compareService: CompareBidsService,
    private menuService: MenuService,
  ) {}
  ngOnInit() {
    this.currentTender = this.tenderService._currentTender.getValue();
    this.paramSubscription = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.menuService.setItems(id || '');
      console.log(id, this.currentTender?.id);
      if (id && id !== this.currentTender?.id) {
        this.tenderService.getTenderById(id).subscribe({
          next: (result) => {
            this.currentTender = result;
            if (this.currentTender?.id) {
              this.bids$ = this.bidService.getBidsByTenderId(
                this.currentTender?.id,
              );
            }
          },
        });
      }
    });
    if (this.currentTender?.id) {
      console.log(this.currentTender.id);
      this.bidSubscription = this.bidService
        .getBidsByTenderId(this.currentTender?.id)
        .subscribe((result) => {
          this.bidService.bidsSubject.next(result);
          this.bids$ = this.bidService.bids$;
        });
    }
  }

  seeTenderBidDetails(bid: TenderBid) {
    let tableData = [];
    if (bid.discovery_data) {
      for (const key in bid.discovery_data) {
        tableData.push(bid.discovery_data[key]);
      }
      this.tableService.loadData(tableData);
      this.router.navigate(['/ihale/kesif-detay']);
    } else {
      console.log('no discovery data');
    }
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  compareBids() {
    if (this.selectedBids) {
      this.compareService.compareBids = this.selectedBids;
      this.compareService.tender = this.tenderService._currentTender.getValue();
      this.router.navigate(['/ihale/karsilastir']);
    }
  }

  ngOnDestroy() {
    this.menuService.clearItems();
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.bidSubscription) {
      this.bidSubscription.unsubscribe();
    }
  }
}

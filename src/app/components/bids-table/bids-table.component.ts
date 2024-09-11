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

  @Output() createReports = new EventEmitter<void>();

  @Output() selectedBids!: TenderBid[];

  constructor(
    private tableService: TablodataService,
    private router: Router,
    private compareService: CompareBidsService,
    private tenderService: TenderService,
  ) {}

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

  onCreateReports() {
    this.createReports.emit();
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
}

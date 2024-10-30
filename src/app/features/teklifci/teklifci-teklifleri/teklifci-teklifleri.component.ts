import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TenderBid } from '../../../models/tender-bid';
import { BidService } from '../../../services/bid.service';
import { TablodataService } from '../../../services/tablodata.service';
import { Router } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-teklifci-teklifleri',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule, InputIconModule, IconFieldModule, InputTextModule],
  templateUrl: './teklifci-teklifleri.component.html',
  styleUrl: './teklifci-teklifleri.component.scss',
})
export class TeklifciTeklifleriComponent implements OnInit {
  bids$!: Observable<TenderBid[] | null>;
  constructor(
    private bidService: BidService,
    private tableService: TablodataService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.bids$ = this.bidService.getBidsByBidderId();
  }

  seeTenderBidDetails(bid: TenderBid) {
    let tableData = [];
    if (bid.discovery_data) {
      for (const key in bid.discovery_data) {
        tableData.push(bid.discovery_data[key]);
      }
      this.tableService.loadData(tableData);
      this.router.navigate(['/teklifci/kesif-detay']);
    } else {
      console.log('no discovery data');
    }
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
}

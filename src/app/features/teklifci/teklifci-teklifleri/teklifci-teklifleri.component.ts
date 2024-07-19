import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TenderBid } from '../../../models/tender-bid';
import { BidService } from '../../../services/bid.service';

@Component({
  selector: 'app-teklifci-teklifleri',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule],
  templateUrl: './teklifci-teklifleri.component.html',
  styleUrl: './teklifci-teklifleri.component.scss'
})
export class TeklifciTeklifleriComponent implements OnInit{
  bids$!: Observable<TenderBid[]|null>
  constructor(private bidService: BidService) {}
  ngOnInit(): void {
    this.bids$ = this.bidService.getBidsByBidderId();
  }
  selectTeklif(teklif: TenderBid) {
    console.log(teklif)
  }
}

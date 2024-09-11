import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Tender } from '../../../models/tender';
import { TenderService } from '../../../services/tender.service';
import { TenderBid } from '../../../models/tender-bid';
import { BidService } from '../../../services/bid.service';

@Component({
  selector: 'app-teklifci',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './teklifci.component.html',
  styleUrl: './teklifci.component.scss',
})
export class TeklifciComponent implements OnInit {
  tenders$!: Observable<Tender[]>;
  tenderBids$!: Observable<TenderBid[]>;

  constructor(
    private tenderService: TenderService,
    private bidService: BidService,
  ) {}
  ngOnInit(): void {
    this.tenders$ = this.tenderService.getTendersByBidderId();
    this.tenderBids$ = this.bidService.getBidsByBidderId();
  }

  ngOnDestroy() {}
}

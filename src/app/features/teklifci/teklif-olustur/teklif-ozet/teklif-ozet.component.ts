import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BidService } from '../../../../services/bid.service';
import { TeklifDetayComponent } from "../../teklif-detay/teklif-detay.component";
import { TenderBid } from '../../../../models/tender-bid';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teklif-ozet',
  standalone: true,
  imports: [ButtonModule, RouterLink, TeklifDetayComponent, AsyncPipe],
  templateUrl: './teklif-ozet.component.html',
  styleUrl: './teklif-ozet.component.scss',
})
export class TeklifOzetComponent {
  currentBid$!: Observable<TenderBid | null>
  constructor(
    private bidService: BidService,
  ) {}
  ngOnInit(): void {
    this.bidService.setBidData();
    this.currentBid$ = this.bidService.bid$;
  }
  createBid() {
    this.bidService.createBid()?.subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error),
    });
  }
}

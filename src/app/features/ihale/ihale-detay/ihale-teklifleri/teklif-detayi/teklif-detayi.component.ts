import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BidService } from '../../../../../services/bid.service';
import { TenderBid } from '../../../../../models/tender-bid';
import { TeklifDetayComponent } from "../../../../teklifci/teklif-detay/teklif-detay.component";

@Component({
  selector: 'app-teklif-detayi',
  standalone: true,
  imports: [TeklifDetayComponent],
  templateUrl: './teklif-detayi.component.html',
  styleUrl: './teklif-detayi.component.scss'
})
export class TeklifDetayiComponent {
  paramSubscription!: Subscription;
  bid!: TenderBid;
  constructor(
    private route: ActivatedRoute,
    private bidService: BidService
  ) {}
  ngOnInit() {
    this.paramSubscription = this.route.paramMap.subscribe((params) => {
      const id = params.get('teklifid');
      if (id) {
        this.bid = this.bidService.bidsSubject.getValue().find(x=> x.id===id);
       }
    });
  }

  ngOnDestroy() {
    if(this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}

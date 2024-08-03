import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BidderService } from '../../../../services/bidder.service';
import { UserDetail } from '../../../../models/user-detail.interface';

@Component({
  selector: 'app-teklifci-detay',
  standalone: true,
  imports: [],
  templateUrl: './teklifci-detay.component.html',
  styleUrl: './teklifci-detay.component.scss'
})
export class TeklifciDetayComponent {
  bidder! :UserDetail |null;
  constructor(private route: ActivatedRoute,
    private bidderService: BidderService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const bidderId=params.get('id');
        if(bidderId) {
          this.bidderService.getBidderDetails(bidderId).then((detail) => {
            this.bidder = detail;
            console.log(this.bidder);
          });
        }
      }
    )
  }
}

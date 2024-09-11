import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tender } from '../../../../../models/tender';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TenderService } from '../../../../../services/tender.service';
import { MenuService } from '../../../../../services/menu.service';
import { TenderBid } from '../../../../../models/tender-bid';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BidsTableComponent } from '../../../../../components/bids-table/bids-table.component';
import { BidService } from '../../../../../services/bid.service';

@Component({
  selector: 'app-rapor-olustur',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ButtonModule, BidsTableComponent],
  templateUrl: './rapor-olustur.component.html',
  styleUrl: './rapor-olustur.component.scss',
})
export class RaporOlusturComponent {
  tenderId!: string | null;
  tender$!: Observable<Tender | null>;
  bids$!: Observable<TenderBid[]>;
  showCompare = false;

  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService,
    private menuService: MenuService,
    private bidService: BidService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.tenderId = params.get('id');
      if (this.tenderId) {
        this.tender$ = this.tenderService.currentTender$;
        this.menuService.setItems(this.tenderId);
        this.bids$ = this.bidService.getBidsByTenderId(this.tenderId);
      }
    });
  }

  ngOnDestroy() {
    this.menuService.clearItems();
  }
}

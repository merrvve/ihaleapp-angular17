import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { TableModule } from 'primeng/table';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuService } from '../../../services/menu.service';
import { TenderService } from '../../../services/tender.service';
import { Tender } from '../../../models/tender';
import { IhaleOzetComponent } from '../ihale-ozet/ihale-ozet.component';
import { BidService } from '../../../services/bid.service';
import { TenderBid } from '../../../models/tender-bid';

@Component({
  selector: 'app-ihale-detay',
  standalone: true,
  templateUrl: './ihale-detay.component.html',
  styleUrl: './ihale-detay.component.scss',
  imports: [
    AsyncPipe,
    LoadingSpinnerComponent,
    TableModule,
    IhaleOzetComponent,
    RouterLink,
  ],
})
export class IhaleDetayComponent implements OnInit {
  tenderId!: string;
  tender$!: Observable<Tender | null>;
  menuItems: MenuItem[] = [];
  bids$!: Observable<TenderBid[]>;

  paramSupscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private tenderService: TenderService,
    private bidService: BidService,
  ) {}

  ngOnInit() {
    this.paramSupscription = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.tenderId = id;
        this.tender$ = this.tenderService.getTenderById(id);
        this.bids$ = this.bidService.getBidsByTenderId(id);
        this.menuService.setItems(this.tenderId);
      }
    });
  }

  ngOnDestroy() {
    this.menuService.clearItems();
    this.paramSupscription.unsubscribe();
  }
}

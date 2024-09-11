import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CompareTablesService } from '../../../../services/compare-tables.service';
import { CompareTable } from '../../../../models/compare-table';
import { TableModule } from 'primeng/table';
import { CompareBidsService } from '../../../../services/compare-bids.service';
import { Tender } from '../../../../models/tender';
import { TenderBid } from '../../../../models/tender-bid';
import { BidService } from '../../../../services/bid.service';
import { TenderService } from '../../../../services/tender.service';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-list-compare-tables',
  standalone: true,
  imports: [ButtonModule, RouterLink, TableModule],
  templateUrl: './list-compare-tables.component.html',
  styleUrl: './list-compare-tables.component.scss',
})
export class ListCompareTablesComponent {
  tenderId!: string | null;
  compareTables!: CompareTable[];
  constructor(
    private route: ActivatedRoute,
    private compareTableService: CompareTablesService,
    private compareBidsService: CompareBidsService,
    private bidService: BidService,
    private tenderSerivce: TenderService,
    private router: Router,
    private menuService: MenuService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.tenderId = params.get('id');
      if (this.tenderId) {
        this.menuService.setItems(this.tenderId);
        this.compareTableService
          .getTablesByTenderId(this.tenderId)
          .then((result) => {
            if (result) {
              this.compareTables = result;
            } else {
              this.compareTables = [];
            }
          });
      }
    });
  }

  openTable(table: CompareTable) {
    let tender: Tender | null;
    let bidsList: TenderBid[] = [];
    if (this.tenderId) {
      this.tenderSerivce.getTenderById(this.tenderId).subscribe((result) => {
        tender = result;
        if (tender && tender.id) {
          this.compareBidsService.tender = tender;

          this.bidService.getBidsByTenderId(tender.id).subscribe((bids) => {
            bids.forEach((bid) => {
              if (bid.id) {
                if (table.bids.includes(bid.id)) {
                  console.log(table.bids, bid.id);
                  bidsList.push(bid);
                }
              }
            });
            this.compareBidsService.compareBids = bidsList;
            this.router.navigate(['/ihale/karsilastir']);
          });
        }
      });
    }
  }

  deleteTable(tableid: string) {
    this.compareTableService.deleteTable(tableid);
  }
}

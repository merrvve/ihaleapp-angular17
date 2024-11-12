import { Component } from '@angular/core';
import { TableComponent } from '../../../../table/table.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BidService } from '../../../../../services/bid.service';
import { TablodataService } from '../../../../../services/tablodata.service';
import { RevisionsService } from '../../../../../services/revisions.service';
import { MenuService } from '../../../../../services/menu.service';

@Component({
  selector: 'app-kesif-detay',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './kesif-detay.component.html',
  styleUrl: './kesif-detay.component.scss',
})
export class KesifDetayComponent {
  paramsSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private bidService: BidService,
    private tableDataService: TablodataService,
    private revisionService: RevisionsService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe((params) => {
      const bidId = params.get('teklifid');
      const tenderId = params.get('id');
      this.menuService.setItems(tenderId);
      console.log(tenderId)
      if (bidId) {
        const bid = this.bidService.bidsSubject
          .getValue()
          .find((x) => x.id === bidId);
        let tableData = [];
        if (bid.discovery_data) {
          for (const key in bid.discovery_data) {
            tableData.push(bid.discovery_data[key]);
          }
          this.revisionService.setCurrentRevision(bid.tenderId,bid.revisionName)
          this.tableDataService.loadData(tableData);
          console.log("kesif detay,", tableData)
        } else {
          console.log('no discovery data');
        }
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
  }
}

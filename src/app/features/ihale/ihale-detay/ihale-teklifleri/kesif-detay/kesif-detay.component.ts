import { Component } from '@angular/core';
import { TableComponent } from '../../../../table/table.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BidService } from '../../../../../services/bid.service';
import { TablodataService } from '../../../../../services/tablodata.service';

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
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe((params) => {
      const bidId = params.get('teklifid');
      if (bidId) {
        const bid = this.bidService.bidsSubject
          .getValue()
          .find((x) => x.id === bidId);
        let tableData = [];
        if (bid.discovery_data) {
          for (const key in bid.discovery_data) {
            tableData.push(bid.discovery_data[key]);
          }
          this.tableDataService.loadData(tableData);
        } else {
          console.log('no discovery data');
        }
      }
    });
  }
}

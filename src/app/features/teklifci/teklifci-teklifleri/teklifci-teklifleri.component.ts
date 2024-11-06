import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TenderBid } from '../../../models/tender-bid';
import { BidService } from '../../../services/bid.service';
import { TablodataService } from '../../../services/tablodata.service';
import { Router } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { TenderService } from '../../../services/tender.service';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api/menuitem';
import { Tender } from '../../../models/tender';

@Component({
  selector: 'app-teklifci-teklifleri',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule, InputIconModule, IconFieldModule, InputTextModule, SplitButtonModule],
  templateUrl: './teklifci-teklifleri.component.html',
  styleUrl: './teklifci-teklifleri.component.scss',
})
export class TeklifciTeklifleriComponent implements OnInit {
  bids$!: Observable<TenderBid[] | null>;
  subscription!: Subscription;
  
  constructor(
    private bidService: BidService,
    private tenderService: TenderService,
    private tableService: TablodataService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.bids$ = this.bidService.bids$;
  }

  getEditItems(bid: TenderBid) {
    return [
      {
        label: 'Düzenle',
        command: () => {
          this.editBid(bid); // Pass bid to editBid
        }
      },
      {
        label: 'Yeni Teklif Oluştur',
        command: () => {
          this.newBid(bid); // Pass bid to editBid
        }
      },
    ];
  }

  newBid(bid: TenderBid) {
    this.tenderService.getTenderById(bid.tenderId).subscribe({
      next: (result) => {
        if (result) {
          
          this.bidService.tenderSubject.next(result);
          let tableData = [];
          if (result.discoveryData) {
            for (const key in result.discoveryData) {
              tableData.push(result.discoveryData[key]);
            }
          }

          this.tableService.loadData(tableData);

          let bidData: TenderBid = {
            bidder_id: bid.bidder_id,
            created_at: new Date().toLocaleDateString('tr-TR'),
            revisionId: null,
            revisionName:'R1',
            company_id: bid.company_id,
            company_name: bid.company_name,
            total_price: this.tableService.allTreeTotal,
            discovery_data: result.discoveryData,
          };
          this.router.navigate(['/teklifci/teklif-olustur']);
        }
      },
    });
  }


  seeTenderBidDetails(bid: TenderBid) {
    let tableData = [];
    if (bid.discovery_data) {
      for (const key in bid.discovery_data) {
        tableData.push(bid.discovery_data[key]);
      }
      this.tableService.loadData(tableData);
      this.router.navigate(['/teklifci/kesif-detay']);
    } else {
      console.log('no discovery data');
    }
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }

  editBid(bid: TenderBid) {
    let tableData = [];
    if (bid.discovery_data) {
      for (const key in bid.discovery_data) {
        tableData.push(bid.discovery_data[key]);
      }
      this.tableService.loadData(tableData);
    }
    bid.isEditMode = true;
    this.subscription= this.tenderService.getTenderById(bid.tenderId).subscribe(
      result=> {
        this.bidService.setCurrentTender(result);
        this.bidService.setCurrentBid(bid);
        this.router.navigate(['/teklifci/teklif-olustur']);
      }
    )
    
  }

  deleteBid(bidId: string, tenderId: string) {
    this.bidService.deleteBid(bidId, tenderId);
  }
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

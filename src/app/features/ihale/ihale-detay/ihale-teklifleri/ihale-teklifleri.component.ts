import { Component } from '@angular/core';
import { TenderService } from '../../../../services/tender.service';
import { Tender } from '../../../../models/tender';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BidService } from '../../../../services/bid.service';
import { TenderBid } from '../../../../models/tender-bid';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TablodataService } from '../../../../services/tablodata.service';
import { CompareBidsService } from '../../../../services/compare-bids.service';

@Component({
  selector: 'app-ihale-teklifleri',
  standalone: true,
  imports: [AsyncPipe,LoadingSpinnerComponent, TableModule, ButtonModule,IconFieldModule,InputIconModule,InputTextModule, RouterLink],
  templateUrl: './ihale-teklifleri.component.html',
  styleUrl: './ihale-teklifleri.component.scss'
})
export class IhaleTeklifleriComponent {
  currentTender! : Tender | null;
  bids$!: Observable<TenderBid[]>;
  selectedBids! : TenderBid[];
  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService,
    private tableService: TablodataService,
    private router: Router,
  private bidService: BidService,
private compareService: CompareBidsService) {}
  ngOnInit() {
    this.currentTender = this.tenderService._currentTender.value;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id && id!==this.currentTender?.id ) {
        this.tenderService.getTenderById(id).subscribe({
          next: (result) => {this.currentTender=result;
            if(this.currentTender?.id) {
              this.bids$= this.bidService.getBidsByTenderId(this.currentTender?.id);
            }
          
          }
        } 
        );
      }
    
      
    });
    if(this.currentTender?.id) {
      console.log(this.currentTender.id)
      this.bids$= this.bidService.getBidsByTenderId(this.currentTender?.id);
    }

  }

  seeTenderBidDetails(bid: TenderBid) {
   
    let tableData =[];
    if(bid.discovery_data) {
              for(const key in bid.discovery_data) {
                tableData.push(bid.discovery_data[key])
              }
              this.tableService.loadData(tableData);
              this.router.navigate(['/ihale/kesif-detay']);
            }
            else {
              console.log("no discovery data")
            }
            
           
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  compareBids() {
    if(this.selectedBids) {
      this.compareService.compareBids=this.selectedBids;
      this.compareService.tender = this.tenderService._currentTender.getValue();
      this.router.navigate(['/ihale/karsilastir'])
    }
    
  }
}

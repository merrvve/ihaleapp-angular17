import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TenderBid } from '../../../../../models/tender-bid';
import { BidService } from '../../../../../services/bid.service';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinnerComponent } from "../../../../../components/loading-spinner/loading-spinner.component";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TenderService } from '../../../../../services/tender.service';
import { TablodataService } from '../../../../../services/tablodata.service';
import { CompareBidsService } from '../../../../../services/compare-bids.service';

@Component({
  selector: 'app-firma-teklifleri',
  standalone: true,
  imports: [AsyncPipe, LoadingSpinnerComponent,  TableModule, ButtonModule,IconFieldModule,InputIconModule,InputTextModule, RouterLink],
  templateUrl: './firma-teklifleri.component.html',
  styleUrl: './firma-teklifleri.component.scss'
})
export class FirmaTeklifleriComponent implements OnInit {
  id: string | null = null;
  company_id: string | null = null;
  bids$!: Observable<TenderBid[]>;
  selectedBids! : TenderBid[];
  constructor(private route: ActivatedRoute,
    private bidService: BidService,
    private tenderService: TenderService,
    private tableService: TablodataService,
    private router: Router,
private compareService: CompareBidsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.company_id = params.get('firmaid');
      // Now you can use id and firmaid in your component
      console.log(this.id, this.company_id);
      if(this.id) {
        this.bids$=this.bidService.getBidsByTenderId(this.id).pipe(
          map((bids:TenderBid[])=> 
            bids.filter(bid=>bid.company_id===this.company_id)
          
            
            )
        )
      }
      
    });
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

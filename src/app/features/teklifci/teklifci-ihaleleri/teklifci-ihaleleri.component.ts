import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { TeklifciService } from '../../../services/teklifci.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TablodataService } from '../../../services/tablodata.service';
import { Router } from '@angular/router';
import { Tender } from '../../../models/tender';
import { TenderService } from '../../../services/tender.service';
import { AsyncPipe } from '@angular/common';
import { BidService } from '../../../services/bid.service';

@Component({
  selector: 'app-teklifci-ihaleleri',
  standalone: true,
  imports: [TableModule,ButtonModule, AsyncPipe],
  templateUrl: './teklifci-ihaleleri.component.html',
  styleUrl: './teklifci-ihaleleri.component.scss'
})
export class TeklifciIhaleleriComponent implements OnInit {
  tenders$!: Observable<Tender[]>
  constructor(private tableService: TablodataService, private router: Router,
    private tenderService: TenderService,
    private bidService: BidService
  ) {}

  ngOnInit() {
    this.tenders$ = this.tenderService.tenders$;
  
  }

  ngOnDestroy() {
  }

  createBid(tenderId: string) {
    this.tenderService.getTenderById(tenderId).subscribe(
      {
        next:(result)=> {
          if(result) {
            console.log(result)
            result.id = tenderId;
            this.bidService.tenderSubject.next(result);
            let tableData =[];
            if(result.discoveryData) {
              for(const key in result.discoveryData) {
                tableData.push(result.discoveryData[key])
              }
            }
            
            this.tableService.loadData(tableData);
            this.router.navigate(['/teklifci/teklif-olustur']);
          }
        }
      }
    )
  //   this.teklifciService.getIhaleDetail(ihaleId).subscribe(
  //     {
  //       next: (result) => {
  //         this.tableService.loadData(result.kesif);
  //         this.teklifciService.teklif.ihale = result.id ? result.id : -1
  //         this.teklifciService.teklif.kesif = result.kesif
  //         this.teklifciService.ihale = result
  //         this.router.navigate(['/teklifci/teklif-olustur'])
  //       },
  //       error: (error) => console.log(error)
  //     }
  //   )
  }
  
}

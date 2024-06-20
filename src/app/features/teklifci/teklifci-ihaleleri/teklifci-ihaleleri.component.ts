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

@Component({
  selector: 'app-teklifci-ihaleleri',
  standalone: true,
  imports: [TableModule,ButtonModule, AsyncPipe],
  templateUrl: './teklifci-ihaleleri.component.html',
  styleUrl: './teklifci-ihaleleri.component.scss'
})
export class TeklifciIhaleleriComponent implements OnInit {
  tenders$!: Observable<Tender[]>
  constructor(private teklifciService: TeklifciService, private tableService: TablodataService, private router: Router,
    private tenderService: TenderService
  ) {}

  ngOnInit() {
    this.tenders$ = this.tenderService.tenders$;
  
  }

  ngOnDestroy() {
  }

  teklifVer(ihaleId: number) {
    this.teklifciService.getIhaleDetail(ihaleId).subscribe(
      {
        next: (result) => {
          this.tableService.loadData(result.kesif);
          this.teklifciService.teklif.ihale = result.id ? result.id : -1
          this.teklifciService.teklif.kesif = result.kesif
          this.teklifciService.ihale = result
          this.router.navigate(['/teklifci/teklif-olustur'])
        },
        error: (error) => console.log(error)
      }
    )
  }
  
}

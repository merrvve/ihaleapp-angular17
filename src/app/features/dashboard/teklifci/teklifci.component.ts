import { Component, OnInit } from '@angular/core';
import { TeklifciService } from '../../../services/teklifci.service';
import { Ihale } from '../../../models/ihale.interface';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe, NgIf } from '@angular/common';
import { Teklif } from '../../../models/teklif.interface';
import { RouterLink } from '@angular/router';
import { Tender } from '../../../models/tender';
import { TenderService } from '../../../services/tender.service';

@Component({
  selector: 'app-teklifci',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './teklifci.component.html',
  styleUrl: './teklifci.component.scss',
})
export class TeklifciComponent implements OnInit {

  tenders$! : Observable<Tender[]>;
  teklifler$! : Observable<Teklif[]>;
  
  ihaleler! : Ihale[];
  constructor(private teklifciService: TeklifciService,
    private tenderService: TenderService
  ) {}
  ngOnInit(): void {
      this.tenders$ = this.tenderService.getTendersByBidderId();
      this.teklifler$ = this.teklifciService.getTeklifciTeklifleri();
      
  }

  ngOnDestroy() {
    
  }
}

import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IhaleService } from '../../../services/ihale.service';
import { Observable, Subscription } from 'rxjs';
import { Ihale } from '../../../models/ihale.interface';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { TenderService } from '../../../services/tender.service';
import { Tender } from '../../../models/tender';

@Component({
  selector: 'app-ihale-listele',
  standalone: true,
  imports: [TableModule, ButtonModule, AsyncPipe, LoadingSpinnerComponent, JsonPipe, DatePipe],
  templateUrl: './ihale-listele.component.html',
  styleUrl: './ihale-listele.component.scss',
})
export class IhaleListeleComponent implements OnInit {
  ihaleler$!: Observable<Ihale[]>;
  tenders$!: Observable<Tender[]>;
  
  constructor(private ihaleService: IhaleService,
    private tenderService: TenderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ihaleler$=this.ihaleService.getIhaleler();
   
    this.tenders$ =  this.tenderService.getTendersByOwnerId();
    
  }

  
  selectIhale(ihaleId: number) {
    this.router.navigate(['ihale/ihale/',ihaleId])
  }
  
}

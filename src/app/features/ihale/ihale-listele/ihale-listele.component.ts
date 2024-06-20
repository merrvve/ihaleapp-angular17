import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Observable, Subscription } from 'rxjs';
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
  tenders$!: Observable<Tender[]>;
  
  constructor(
    private tenderService: TenderService,
    private router: Router
  ) {}

  ngOnInit() {
   
    this.tenders$ =  this.tenderService.getTendersByOwnerId();
    
  }

  
  selectIhale(ihaleId: number) {
    this.router.navigate(['ihale/ihale/',ihaleId])
  }
  
}

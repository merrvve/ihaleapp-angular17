import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgStyle } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { Observable, map } from 'rxjs';
import { Tender } from '../../../models/tender';
import { TenderService } from '../../../services/tender.service';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgStyle, TableModule,CurrencyPipe,MenuModule, AsyncPipe, LoadingSpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
 
  tenders$! : Observable<Tender[]>;
  totalCost: number =0;
  completedCount: number = 0;
  totalCount: number = 0;
  completedCost: number= 0;
  constructor(private tenderService: TenderService) {}
  ngOnInit(): void {
    this.tenders$ = this.tenderService.getTendersByOwnerId().pipe(
      map((tenders)=> {
        const completedTenders = tenders.filter(tender=>tender.isCompleted===true);
        this.totalCost = tenders.reduce((acc,tender)=> acc+tender.cost,0);
        this.completedCost = completedTenders.reduce((acc,tender)=>acc+tender.cost,0)
        this.totalCount = tenders.length;
        this.completedCount = completedTenders.length;
        return tenders;
      })
    )
  }

 
}

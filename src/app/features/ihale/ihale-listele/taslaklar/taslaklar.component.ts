import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { Tender } from '../../../../models/tender';
@Component({
  selector: 'app-taslaklar',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    AsyncPipe,
    LoadingSpinnerComponent,
    JsonPipe,
    DatePipe,
  ],
  templateUrl: './taslaklar.component.html',
  styleUrl: './taslaklar.component.scss',
})
export class TaslaklarComponent implements OnInit {
  tenders$!: Observable<Tender[]>;

  constructor(
    private tenderService: TenderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.tenders$ = this.tenderService.getTendersByOwnerId(true);
  }

  editTender(tender: Tender) {
    tender.isEditMode = true;
    this.tenderService.setTender(tender);
    this.router.navigate(['ihale/ihale-olustur']);
  }

  deleteTender(tenderId: string) {
    this.tenderService.deleteTender(tenderId);
  }
}

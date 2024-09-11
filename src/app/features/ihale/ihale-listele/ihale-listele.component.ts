import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { TenderService } from '../../../services/tender.service';
import { Tender } from '../../../models/tender';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-ihale-listele',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    AsyncPipe,
    LoadingSpinnerComponent,
    JsonPipe,
    DatePipe,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './ihale-listele.component.html',
  styleUrl: './ihale-listele.component.scss',
})
export class IhaleListeleComponent implements OnInit {
  tenders$!: Observable<Tender[]>;

  constructor(
    private tenderService: TenderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.tenders$ = this.tenderService.getTendersByOwnerId();
  }

  selectTender(tenderId: number) {
    this.router.navigate(['ihale/ihale/', tenderId]);
  }
  editTender(tender: Tender) {
    tender.isEditMode = true;
    this.tenderService.setTender(tender);
    this.router.navigate(['ihale/ihale-olustur']);
  }
  deleteTender(tenderId: string) {
    this.tenderService.deleteTender(tenderId);
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
}

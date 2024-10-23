import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Tender } from '../../../../models/tender';
import { TenderService } from '../../../../services/tender.service';
import { MenuService } from '../../../../services/menu.service';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Qa } from '../../../../models/qa';
import { LoadingSpinnerComponent } from "../../../../components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-soru-cevap',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule, LoadingSpinnerComponent],
  templateUrl: './soru-cevap.component.html',
  styleUrl: './soru-cevap.component.scss',
})
export class SoruCevapComponent {
  tenderId!: string | null;
  tender$!: Observable<Tender | null>;
  qas!: Qa[];

  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService,
    private menuService: MenuService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.tenderId = params.get('id');
      if (this.tenderId) {
        this.tender$ = this.tenderService.currentTender$;
        this.menuService.setItems(this.tenderId);
      }
    });
    this.qas = [{
      companyName: 'company',
      companyId: '',
      tenderOwner: '',
      createdAt: 'tarih',
      question: '',
      status: 'PENDING'
    }]
  }

  ngOnDestroy() {
    this.menuService.clearItems();
  }
}

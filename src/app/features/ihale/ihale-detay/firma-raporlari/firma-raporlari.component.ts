import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Tender } from '../../../../models/tender';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { MenuService } from '../../../../services/menu.service';
import { AsyncPipe } from '@angular/common';
import { ReportsService } from '../../../../services/reports.service';
import { ReportData } from '../../../../models/report-data';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-firma-raporlari',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule],
  templateUrl: './firma-raporlari.component.html',
  styleUrl: './firma-raporlari.component.scss',
})
export class FirmaRaporlariComponent {
  tenderId!: string | null;
  tender$!: Observable<Tender | null>;
  reports$!: Observable<ReportData[]>;

  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService,
    private menuService: MenuService,
    private reportService: ReportsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.tenderId = params.get('id');
      if (this.tenderId) {
        this.tender$ = this.tenderService.currentTender$;
        this.menuService.setItems(this.tenderId);
        this.reports$ = this.reportService.getReportsByTenderId(this.tenderId);
      }
    });
  }

  ngOnDestroy() {
    this.menuService.clearItems();
  }
}

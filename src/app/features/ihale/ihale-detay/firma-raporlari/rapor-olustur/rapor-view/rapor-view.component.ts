import { AsyncPipe,  NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ReportsService } from '../../../../../../services/reports.service';
import { ReportStatement } from '../../../../../../models/report-statement';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ReportTableCell } from '../../../../../../models/report-table-cell';
import { Subscription, tap } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { NumberFormatPipe } from '../../../../../../utils/number-format.pipe';
import { MenuService } from '../../../../../../services/menu.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rapor-view',
  standalone: true,
  imports: [AsyncPipe, ButtonModule, TableModule,NgClass, TooltipModule, NumberFormatPipe],
  templateUrl: './rapor-view.component.html',
  styleUrl: './rapor-view.component.scss'
})
export class RaporViewComponent {
  reportStatements$!: Observable<ReportStatement>;
  reportTableData$!: Observable<Array<ReportTableCell[]>>
  tenderId!: string;
  columns!: string[];
  subscription!: Subscription;

  constructor(private reportService: ReportsService,
    private menuService: MenuService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit() {
    this.subscription=this.route.paramMap.subscribe((params) => {
      this.tenderId = params.get('id'); 
      this.menuService.setItems(this.tenderId);
    });
    this.reportStatements$ = this.reportService.reportStatements$;
    this.reportTableData$ = this.reportService.reportTableData$.pipe(
      tap(data => {
        this.columns = Object.keys(data[0]);
      })
    );
  }

  printPage() {
    window.print();
  }

  saveReport() {
    this.reportService.saveReport();
  }

  ngOnDestroy() {
    this.menuService.clearItems();
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

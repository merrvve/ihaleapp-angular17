import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ReportsService } from '../../../../../../services/reports.service';
import { ReportStatement } from '../../../../../../models/report-statement';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-rapor-view',
  standalone: true,
  imports: [AsyncPipe, ButtonModule],
  templateUrl: './rapor-view.component.html',
  styleUrl: './rapor-view.component.scss'
})
export class RaporViewComponent {
  reportStatements$!: Observable<ReportStatement>;
  constructor(private reportService: ReportsService) {

  }
  ngOnInit() {
    this.reportStatements$ = this.reportService.reportStatements$;
  }

  printPage() {
    window.print();
  }
}

import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ReportsService } from '../../../../../../services/reports.service';

@Component({
  selector: 'app-rapor-view',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './rapor-view.component.html',
  styleUrl: './rapor-view.component.scss'
})
export class RaporViewComponent {
  reportStatements$!: Observable<string[]>;
  constructor(private reportService: ReportsService) {

  }
  ngOnInit() {
    this.reportStatements$ = this.reportService.reportStatements$;
  }
}

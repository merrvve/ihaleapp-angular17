import { Component } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { Tender } from '../../../../../models/tender';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../../../../services/tender.service';
import { MenuService } from '../../../../../services/menu.service';
import { LoadingSpinnerComponent } from '../../../../../components/loading-spinner/loading-spinner.component';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ReportSettings } from '../../../../../models/report-settings';
import { ReportSettingService } from '../../../../../services/report-setting.service';

@Component({
  selector: 'app-rapor-ayar',
  standalone: true,
  imports: [
    LoadingSpinnerComponent,
    AsyncPipe,
    ButtonModule,
    FormsModule,
    SelectButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './rapor-ayar.component.html',
  styleUrl: './rapor-ayar.component.scss',
})
export class RaporAyarComponent {
  tenderId!: string | null;
  tender$!: Observable<Tender | null>;

  baseOptions = ['Minimum', 'Ortalama', 'Bütçe'];
  selectedBaseOption: string = 'Minimum';

  reportSetting! : ReportSettings; 
  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService,
    private menuService: MenuService,
    private reportService: ReportSettingService
  ) {}

  ngOnInit() {
    // Initialize default or saved report settings
    this.reportSetting = this.reportService.currentSetting || {
      baseValue: 'Minimum',
      showBaseValue: true,
      toBaseRatio: 10,
      showHighPrice: true,
      showHightRatio: true,
      showLowPrice: true,
      showLowRatio: true,
      showAllTotal: true,
      showSubHeading: true,
      showAllRows: true,
      calculateSetting: "onlyTotal",
    };

    // Reactively update the tender$ based on route parameter changes
    this.tender$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.tenderId = params.get('id');
        if (this.tenderId) {
          // Fetch the tender by id
          return this.tenderService.getTenderById(this.tenderId);
        }
        return of(null); // Fallback when no tenderId exists
      }),
      tap((tender) => {
        if (tender?.reportSetting) {
          // Update reportSetting if the tender has a reportSetting
          this.reportSetting = tender.reportSetting;
          this.reportService.currentSetting = tender.reportSetting;
        }
        this.menuService.setItems(this.tenderId!); // Update menu
      })
    );
  }
 

  saveSetting(reportSetting: ReportSettings) {
    if(this.tenderId) {
      this.reportService.updateReportSetting(this.tenderId,this.reportSetting)
    }
  }

  ngOnDestroy() {
    this.menuService.clearItems();
  }
}

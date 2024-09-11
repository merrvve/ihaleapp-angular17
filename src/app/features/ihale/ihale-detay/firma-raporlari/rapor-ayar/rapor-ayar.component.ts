import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
  }

  ngOnDestroy() {
    this.menuService.clearItems();
  }
}

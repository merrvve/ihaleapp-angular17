import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Tender } from '../../../../models/tender';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-firma-raporlari',
  standalone: true,
  imports: [],
  templateUrl: './firma-raporlari.component.html',
  styleUrl: './firma-raporlari.component.scss'
})
export class FirmaRaporlariComponent {
  tenderId!: string | null;
  tender$!: Observable<Tender |null>;
  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tenderId = params.get('id');
      if(this.tenderId) {
        this.tender$ = this.tenderService.currentTender$;
        this.menuService.setItems(this.tenderId);
      }
    });
  }

  ngOnDestroy() {
    this.menuService.clearItems();
  }
}

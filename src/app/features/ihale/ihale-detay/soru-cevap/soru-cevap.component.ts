import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Tender } from '../../../../models/tender';
import { TenderService } from '../../../../services/tender.service';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-soru-cevap',
  standalone: true,
  imports: [],
  templateUrl: './soru-cevap.component.html',
  styleUrl: './soru-cevap.component.scss',
})
export class SoruCevapComponent {
  tenderId!: string | null;
  tender$!: Observable<Tender | null>;
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

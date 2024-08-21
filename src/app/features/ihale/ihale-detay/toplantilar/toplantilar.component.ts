import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tender } from '../../../../models/tender';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-toplantilar',
  standalone: true,
  imports: [],
  templateUrl: './toplantilar.component.html',
  styleUrl: './toplantilar.component.scss'
})
export class ToplantilarComponent {
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

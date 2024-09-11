import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { Observable } from 'rxjs';
import { Tender } from '../../../../models/tender';
import { AsyncPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-ihale-dosyalari',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule, LoadingSpinnerComponent],
  templateUrl: './ihale-dosyalari.component.html',
  styleUrl: './ihale-dosyalari.component.scss',
})
export class IhaleDosyalariComponent {
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

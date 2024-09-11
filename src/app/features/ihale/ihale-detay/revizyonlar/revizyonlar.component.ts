import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tender } from '../../../../models/tender';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-revizyonlar',
  standalone: true,
  imports: [ButtonModule, TableModule, AsyncPipe, LoadingSpinnerComponent],
  templateUrl: './revizyonlar.component.html',
  styleUrl: './revizyonlar.component.scss',
})
export class RevizyonlarComponent {
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

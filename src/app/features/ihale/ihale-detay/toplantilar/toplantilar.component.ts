import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tender } from '../../../../models/tender';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { MenuService } from '../../../../services/menu.service';
import { TableModule } from 'primeng/table';
import { Meeting } from '../../../../models/meeting';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LoadingSpinnerComponent } from "../../../../components/loading-spinner/loading-spinner.component";



@Component({
  selector: 'app-toplantilar',
  standalone: true,
  imports: [TableModule, AsyncPipe, ButtonModule, LoadingSpinnerComponent],
  templateUrl: './toplantilar.component.html',
  styleUrl: './toplantilar.component.scss',
})
export class ToplantilarComponent {
  tenderId!: string | null;
  tender$!: Observable<Tender | null>;
  meetings!: Meeting[];
  

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
    this.meetings = [{
      ownerId: '',
      name: 'ornek',
      date: '12.12.24',
      notes: 'cdscd',
      location: 'link',
      companies: []
    }]
  }
  
  ngOnDestroy() {
    this.menuService.clearItems();
  }
}

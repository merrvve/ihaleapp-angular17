import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TenderService } from '../../../../services/tender.service';
import { Tender } from '../../../../models/tender';
import { AsyncPipe } from '@angular/common';
import { IhaleOzetComponent } from '../../../ihale/ihale-ozet/ihale-ozet.component';
import { LoadingSpinnerComponent } from "../../../../components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-ihale-detay',
  standalone: true,
  imports: [AsyncPipe, IhaleOzetComponent, LoadingSpinnerComponent],
  templateUrl: './ihale-detay.component.html',
  styleUrl: './ihale-detay.component.scss'
})
export class IhaleDetayComponent {

  paramSubscription!: Subscription;
  tender$!: Observable<Tender>
  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService
  ) {}
  ngOnInit() {
    this.paramSubscription = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.tender$ = this.tenderService.getTenderById(id);
      }
    });
  }
  ngOnDestroy() {
    if(this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    
  }
}

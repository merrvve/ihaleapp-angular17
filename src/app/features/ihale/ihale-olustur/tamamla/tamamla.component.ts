import { Component, OnInit } from '@angular/core';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { TenderService } from '../../../../services/tender.service';
import { Tender } from '../../../../models/tender';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';
import { IhaleOzetComponent } from '../../ihale-ozet/ihale-ozet.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tamamla',
  standalone: true,
  templateUrl: './tamamla.component.html',
  styleUrl: './tamamla.component.scss',
  imports: [
    IhaleOlusturComponent,
    AsyncPipe,
    IhaleOzetComponent,
    ButtonModule,
    RouterLink,
  ],
})
export class TamamlaComponent implements OnInit {
  tender$!: Observable<Tender>;
  isModalVisible: boolean = false;
  isLoading: boolean = false;

  constructor(private tenderService: TenderService) {}
  ngOnInit(): void {
    this.tender$ = this.tenderService.currentTender$;
  }

  onSubmit(isDraft = false, currentTenderIsDraft = false, isEditMode = false) {
    this.isLoading = true;
    this.isModalVisible = true;

    //Save as draft
    if (isDraft) {
      //if current tender is draft, update it
      if (isDraft === currentTenderIsDraft) {
        this.tenderService.updateTender(isDraft);
      }
      //else create new draft tender
      else {
        this.tenderService.createTender(isDraft);
      }
    }
    // save as tender
    else {
      //if it is a draft, update it as a tender
      if (currentTenderIsDraft) {
        this.tenderService.updateTender(isDraft);
      }
      //else, if it is edit mode, update; else create new tender
      else {
        if (isEditMode) {
          this.tenderService.updateTender(isDraft);
        } else {
          this.tenderService.createTender(isDraft);
        }
      }
    }
  }

  showDialog() {
    this.isModalVisible = true;
  }

}

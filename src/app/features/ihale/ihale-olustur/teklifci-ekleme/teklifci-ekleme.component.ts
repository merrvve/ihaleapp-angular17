import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { TableModule } from 'primeng/table';
import { map, Observable, Subscription } from 'rxjs';
import { PickListModule } from 'primeng/picklist';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TenderService } from '../../../../services/tender.service';
import { UserDetail } from '../../../../models/user-detail.interface';
import { BidderService } from '../../../../services/bidder.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-teklifci-ekleme',
  standalone: true,
  templateUrl: './teklifci-ekleme.component.html',
  styleUrl: './teklifci-ekleme.component.scss',
  imports: [
    ButtonModule,
    RouterLink,
    IhaleOlusturComponent,
    TableModule,
    PickListModule,
    DragDropModule,
    AsyncPipe,
  ],
})
export class TeklifciEklemeComponent implements OnInit {
  messages: Message[] = []; // bilgilendirme mesajı
  messages2: Message[] = []; // bilgilendirme mesajı
  isModalVisible: boolean = false;
  isLoading: boolean = false;
  isTeklifciModalVisible: boolean = false;
  bidders$!: Observable<UserDetail[]>;
  selectedBidders: UserDetail[] = [];
  isEditMode!: boolean;
  constructor(
    private tenderService: TenderService,
    private bidderService: BidderService,
  ) {}
  ngOnInit(): void {
    // Teklifçi bilgilerini al
    const bidderIds = this.tenderService._currentTender.getValue().bidders;
    this.bidders$ = this.bidderService.getBidders().pipe(
      map((bidders) => {
        // Filter bidders based on IDs
        this.selectedBidders = bidders.filter(bidder => bidderIds.includes(bidder.uid));
        
        return bidders.filter(bidder => !bidderIds.includes(bidder.uid)) // Still return bidders for `bidders$` observable
      })
    );
    this.isEditMode = this.tenderService._currentTender.value.isEditMode;
   


    
  }

  ngOnDestroy() {
    let bidders: string[] = [];
    for (const bidder of this.selectedBidders) {
      bidders.push(bidder.uid);
    }
    this.tenderService._currentTender.value.bidders = bidders;
  }
}

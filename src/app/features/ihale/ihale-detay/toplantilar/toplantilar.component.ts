import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Tender } from '../../../../models/tender';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { MenuService } from '../../../../services/menu.service';
import { TableModule } from 'primeng/table';
import { Meeting } from '../../../../models/meeting';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LoadingSpinnerComponent } from "../../../../components/loading-spinner/loading-spinner.component";
import { MeetingsService } from '../../../../services/meetings.service';
import { DialogModule } from 'primeng/dialog';
import { YeniToplantiComponent } from "./yeni-toplanti/yeni-toplanti.component";
import { NewMeetingFormComponent } from "./yeni-toplanti/new-meeting-form/new-meeting-form.component";



@Component({
  selector: 'app-toplantilar',
  standalone: true,
  imports: [TableModule, AsyncPipe, ButtonModule, LoadingSpinnerComponent, DatePipe, DialogModule, YeniToplantiComponent, NewMeetingFormComponent],
  templateUrl: './toplantilar.component.html',
  styleUrl: './toplantilar.component.scss',
})
export class ToplantilarComponent {
  tenderId!: string | null;
  tender$!: Observable<Tender | null>;
  meetings$!: Observable<Meeting[]>;
  createVisible: boolean = false;
  subscription!: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService,
    private menuService: MenuService,
    private meetingsService: MeetingsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.tenderId = params.get('id');
      if (this.tenderId) {
        this.tender$ = this.tenderService.currentTender$;
        this.menuService.setItems(this.tenderId);
        this.subscription = this.meetingsService.getAllmeetings(this.tenderId).subscribe()
        this.meetings$ = this.meetingsService.meetings$;
      }
    });
    
  }
  
  deleteMeeting(meetingId: string) {
    this.meetingsService.deletemeeting(this.tenderId, meetingId);
  }

  ngOnDestroy() {
    this.menuService.clearItems();
    this.subscription.unsubscribe();
  }
}

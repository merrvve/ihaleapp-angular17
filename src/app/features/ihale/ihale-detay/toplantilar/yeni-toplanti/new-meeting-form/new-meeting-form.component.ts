import { AsyncPipe } from '@angular/common';
import { Component, Input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { Meeting } from '../../../../../../models/meeting';
import { Observable } from 'rxjs';
import { Company } from '../../../../../../models/company.interface';
import { CompaniesService } from '../../../../../../services/companies.service';
import { MeetingsService } from '../../../../../../services/meetings.service';

@Component({
  selector: 'app-new-meeting-form',
  standalone: true,
  imports: [FormsModule, ButtonModule, MultiSelectModule, AsyncPipe, CalendarModule],
  templateUrl: './new-meeting-form.component.html',
  styleUrl: './new-meeting-form.component.scss'
})
export class NewMeetingFormComponent {
  @Input() tenderId: string;
  
  newMeeting!: Meeting;
  
  companies$!: Observable<Company[]>;
  date!: Date;

  constructor(
    private companyService: CompaniesService,
    private meetingsService: MeetingsService
  ) {}
  ngOnInit() {
    this.companies$ =  this.companyService.getCompanies();

    this.newMeeting = {
      ownerId: undefined,
      name: '',
      date: '',
      notes: '',
      location: '',
      companies: []
    }

    
  }

  createMeeting() {
    this.newMeeting.date = this.date.toString();
    
    if(this.tenderId) {
      this.meetingsService.createMeeting(this.tenderId,this.newMeeting);
     
    }
    
  }

}

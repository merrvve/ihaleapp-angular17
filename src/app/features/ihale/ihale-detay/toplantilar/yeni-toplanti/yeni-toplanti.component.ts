import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MenuService } from '../../../../../services/menu.service';


import { CompaniesService } from '../../../../../services/companies.service';

import { MeetingsService } from '../../../../../services/meetings.service';
import { NewMeetingFormComponent } from './new-meeting-form/new-meeting-form.component';

@Component({
  selector: 'app-yeni-toplanti',
  standalone: true,
  imports: [NewMeetingFormComponent],
  templateUrl: './yeni-toplanti.component.html',
  styleUrl: './yeni-toplanti.component.scss',
})
export class YeniToplantiComponent {
  tenderId!: string;
  
  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}
  ngOnInit() {
    

    this.route.paramMap.subscribe((params) => {
      this.tenderId = params.get('id');
      if (this.tenderId) {
        this.menuService.setItems(this.tenderId);
      }
    });
  }

  
}

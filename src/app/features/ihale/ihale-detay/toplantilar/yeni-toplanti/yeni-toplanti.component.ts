import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../../../../services/tender.service';
import { MenuService } from '../../../../../services/menu.service';
import { Observable } from 'rxjs';
import { Tender } from '../../../../../models/tender';
import { Meeting } from '../../../../../models/meeting';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-yeni-toplanti',
  standalone: true,
  imports: [FormsModule, ButtonModule],
  templateUrl: './yeni-toplanti.component.html',
  styleUrl: './yeni-toplanti.component.scss',
})
export class YeniToplantiComponent {
  @Input() tenderId!: string;
  @Input() ownerId: string;
  newMeeting!: Meeting;

  ngOnInit() {
    this.newMeeting = {
      ownerId: this.ownerId,
      name: '',
      date: '',
      notes: '',
      location: '',
      companies: []
    }
  }
}

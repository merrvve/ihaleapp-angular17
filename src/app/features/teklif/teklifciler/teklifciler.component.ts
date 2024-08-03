import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserDetail } from '../../../models/user-detail.interface';
import { Observable } from 'rxjs/internal/Observable';
import { BidderService } from '../../../services/bidder.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teklifciler',
  standalone: true,
  imports: [TableModule, ButtonModule, AsyncPipe, RouterLink],
  templateUrl: './teklifciler.component.html',
  styleUrl: './teklifciler.component.scss',
})
export class TeklifcilerComponent implements OnInit {
  selectTeklifci(teklifci: any) {}
  
  bidders$!: Observable<UserDetail[]>;
  constructor(
    private bidderService: BidderService,
  ) {}
  
  ngOnInit() {
    this.bidders$=this.bidderService.getBidders();
   
  }

  
}

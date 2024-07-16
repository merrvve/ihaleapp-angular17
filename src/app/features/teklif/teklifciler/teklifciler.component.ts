import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs/internal/Subscription';
import { TeklifciService } from '../../../services/teklifci.service';
import { FirmaYetkilisi } from '../../../models/firmayetkilisi.interface';
import { UserDetail } from '../../../models/user-detail.interface';
import { Observable } from 'rxjs/internal/Observable';
import { BidderService } from '../../../services/bidder.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-teklifciler',
  standalone: true,
  imports: [TableModule, ButtonModule, AsyncPipe],
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

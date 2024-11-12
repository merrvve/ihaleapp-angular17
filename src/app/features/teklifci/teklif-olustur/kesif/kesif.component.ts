import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { TeklifOlusturComponent } from '../teklif-olustur.component';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { BidService } from '../../../../services/bid.service';
import { TablodataService } from '../../../../services/tablodata.service';

@Component({
  selector: 'app-kesif',
  standalone: true,
  templateUrl: './kesif.component.html',
  styleUrl: './kesif.component.scss',
  imports: [
    TableComponent,
    TeklifOlusturComponent,
    ButtonModule,
    RouterLink,
  ],
})
export class KesifComponent implements OnInit {
  

  constructor(
   private dataService: TablodataService
  ) {}
  ngOnInit(): void {}
  
  ngOnDestroy() {
    
  }

}

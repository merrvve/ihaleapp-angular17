import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';

@Component({
  selector: 'app-kesif-olustur',
  standalone: true,
  imports: [
    TableComponent,
    IhaleOlusturComponent,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './kesif-olustur.component.html',
  styleUrl: './kesif-olustur.component.scss',
})
export class KesifOlusturComponent implements OnInit {
  currency! :string;
  
  constructor(private tenderService: TenderService){}
  ngOnInit(): void {
    this.currency = this.tenderService._currentTender.value.currency;
  }
  
}

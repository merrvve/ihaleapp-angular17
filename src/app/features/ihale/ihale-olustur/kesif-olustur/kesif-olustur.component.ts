import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TablodataService } from '../../../../services/tablodata.service';
import { DictToDataList } from '../../../../utils/functions/DictToDataList';

@Component({
  selector: 'app-kesif-olustur',
  standalone: true,
  imports: [
    TableComponent,
    IhaleOlusturComponent,
    ButtonModule,
    RouterLink,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './kesif-olustur.component.html',
  styleUrl: './kesif-olustur.component.scss',
})
export class KesifOlusturComponent implements OnInit {
  currency!: string;
  isEditMode!: boolean;
  constructor(
    private tenderService: TenderService,
    private tableService: TablodataService,
  ) {}
  ngOnInit(): void {
    this.tenderService.currentTender$.subscribe((tender) => {
      this.currency = tender.currency;
      this.isEditMode = tender.isEditMode;
      const data = DictToDataList(tender.discoveryData);
      console.log(data)
      if (data) {
        this.tableService.loadData(data);
      }
    });
  }
}

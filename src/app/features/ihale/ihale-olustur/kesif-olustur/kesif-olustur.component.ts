import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-kesif-olustur',
  standalone: true,
  imports: [TableComponent, IhaleOlusturComponent, ButtonModule, RouterLink, DropdownModule, FormsModule ],
  templateUrl: './kesif-olustur.component.html',
  styleUrl: './kesif-olustur.component.scss',
})
export class KesifOlusturComponent implements OnInit {
  currency!: string;
  isEditMode!: boolean;
  constructor(private tenderService: TenderService,
   
  ) {}
  ngOnInit(): void {
    
    this.currency = this.tenderService._currentTender.value.currency;
    this.isEditMode = this.tenderService._currentTender.value.isEditMode;
    
    
 
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { TablodataService } from '../../../services/tablodata.service';

@Component({
  selector: 'app-ihale-olustur',
  standalone: true,
  imports: [StepsModule],
  templateUrl: './ihale-olustur.component.html',
  styleUrl: './ihale-olustur.component.scss',
})
export class IhaleOlusturComponent implements OnInit {
  steps: any[] = [];
  @Input() isDraft: boolean = false; 
  constructor(private tableService: TablodataService) {
    
  }
  ngOnInit(): void {
    //this.tableService.loadData(this.tableService.ornekData);
    
    this.steps = [
      {
        label: 'İhale Bilgileri',
        routerLink: ['/ihale/ihale-olustur/ihale-bilgileri'],
      },
      {
        label: 'Keşif Oluşturma',
        routerLink: ['/ihale/ihale-olustur/kesif-olustur'],
      },
      {
        label: 'İstenen Dökümanlar',
        routerLink: ['/ihale/ihale-olustur/istenen-dokumanlar'],
      },
      {
        label: 'Teklifçi Ekleme',
        routerLink: ['/ihale/ihale-olustur/teklifci-ekleme'],
      },
      {
        label: 'Tamamla',
        routerLink: ['/ihale/ihale-olustur/tamamla'],
      },
    ];
  }
}

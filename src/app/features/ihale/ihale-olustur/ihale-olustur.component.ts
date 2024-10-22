import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StepsModule } from 'primeng/steps';

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
  @Input() isEditMode:  boolean = false;
  constructor(
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((param)=>{
      this.isEditMode = param['params']['isEditMode'] === 'true'; 
    })
    
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

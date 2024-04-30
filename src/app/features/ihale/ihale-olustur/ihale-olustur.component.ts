import { Component, OnInit } from '@angular/core';
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
  constructor() {}
  ngOnInit(): void {
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
    ];
  }
}

import { Component, OnInit } from '@angular/core';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-teklif-olustur',
  standalone: true,
  imports: [StepsModule],
  templateUrl: './teklif-olustur.component.html',
  styleUrl: './teklif-olustur.component.scss'
})
export class TeklifOlusturComponent implements OnInit {
  steps: any[] = [];
  constructor() {}
  ngOnInit(): void {
    this.steps = [
      {
        label: 'İhale Bilgileri ve Dökümanlar',
        routerLink: ['/teklifci/teklif-olustur/teklif-bilgileri'],
      },
      {
        label: 'Keşif Tablosu',
        routerLink: ['/teklifci/teklif-olustur/kesif'],
      }
    ];
  }

}

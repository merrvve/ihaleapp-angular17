import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-ihale-olustur',
  standalone: true,
  imports: [StepsModule],
  templateUrl: './ihale-olustur.component.html',
  styleUrl: './ihale-olustur.component.scss'
})
export class IhaleOlusturComponent implements OnInit {
  steps:any[] =[];
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.steps = [
      {
          label: 'Keşif Oluşturma',
          routerLink: [('/ihale/ihale-olustur/kesif-olustur')]
      },
      {
          label: 'Dökümanlar',
          routerLink: [('/ihale/ihale-olustur/dokumanlar')]
      },
      {
          label: 'İstenen Dökümanlar',
          routerLink: [('/ihale/ihale-olustur/istenen-dokumanlar')]
      },
      {
          label: 'Teklifçi Ekleme',
          routerLink: [('/ihale/ihale-olustur/teklifci-ekleme')]
      },
      {
        label: 'ihale Bilgileri',
        routerLink: [('/ihale/ihale-olustur/ihale-bilgileri')]
    }
    ];
    
  }

  ngAfterViewInit() {
    this.router.navigate(['/ihale/ihale-olustur/kesif-olustur'])
  }  

}

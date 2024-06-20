import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IhaleService } from '../../../services/ihale.service';
import { Ihale } from '../../../models/ihale.interface';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { TableModule } from 'primeng/table';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuService } from '../../../services/menu.service';
import { TenderService } from '../../../services/tender.service';
import { Tender } from '../../../models/tender';
import { IhaleOzetComponent } from "../ihale-ozet/ihale-ozet.component";

@Component({
    selector: 'app-ihale-detay',
    standalone: true,
    templateUrl: './ihale-detay.component.html',
    styleUrl: './ihale-detay.component.scss',
    imports: [AsyncPipe, LoadingSpinnerComponent, TableModule, IhaleOzetComponent]
})
export class IhaleDetayComponent implements OnInit {
  ihale: any = {}
  ihale$!: Observable<Ihale>;
  tender$!: Observable<Tender|null>;
  menuItems: MenuItem[] =  [
    
    {
      label: 'İhale Dosyası',
      icon: 'pi pi-fw pi-file mr-2',
      items: [
        {
          label: 'Zeyilname (Revizyonlar)',
          icon: 'pi pi-fw pi-plus mr-2',
          
            
          items: [
                {
                  label: 'Zeyilname 1',
                  icon: 'pi pi-fw pi-users mr-2',
                  routerLink: ['teklif/teklifci/listele'],
                },
                {
                  label: 'Zeyilname 2',
                  icon: 'pi pi-fw pi-verified mr-2',
                  routerLink: ['teklif/firmalar'],
                },
              ],
            
    
          
        },
      ],
    },
    {
      label: 'Fiyat Karşılaştırma',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Bütçe Fiyatı',
          icon: 'pi pi-fw pi-user-plus mr-2',
          routerLink: ['teklif/teklifci/ekle'],
        },
        {
          label: 'Yeni Tablo',
          icon: 'pi pi-fw pi-user-plus mr-2',
          routerLink: ['teklif/teklifci/ekle'],
        },
        {
          label: 'Tablolar',
          icon: 'pi pi-fw pi-user-plus mr-2',
          routerLink: ['teklif/teklifci/ekle'],
        },
      ],
    },

    {
      label: 'Firma Raporları',
      icon: 'pi pi-fw pi-power-off',
      // command: (event: any) => {
      //   this.auth.logout();
      // },
    },
    {
      label: 'Soru Cevap',
      icon: 'pi pi-fw pi-user-plus mr-2',
      routerLink: ['teklif/teklifci/ekle'],
    },
    {
      label: 'Toplantılar',
      icon: 'pi pi-fw pi-user-plus mr-2',
      routerLink: ['teklif/teklifci/ekle'],
    },
  ];
 


  constructor(
    private route: ActivatedRoute,
    private ihaleService: IhaleService,
    private menuService: MenuService, 
    private tenderService: TenderService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      if(id) {
        this.tender$ = this.tenderService.getTenderById(id);
      }
  });
    this.menuService.setItems(this.menuItems);
  }
}

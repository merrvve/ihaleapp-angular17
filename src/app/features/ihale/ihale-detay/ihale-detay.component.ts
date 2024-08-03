import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { BidService } from '../../../services/bid.service';
import { TenderBid } from '../../../models/tender-bid';

@Component({
    selector: 'app-ihale-detay',
    standalone: true,
    templateUrl: './ihale-detay.component.html',
    styleUrl: './ihale-detay.component.scss',
    imports: [AsyncPipe, LoadingSpinnerComponent, TableModule, IhaleOzetComponent, RouterLink]
})
export class IhaleDetayComponent implements OnInit {
  tenderId!: string;
  tender$!: Observable<Tender|null>;
  menuItems: MenuItem[] =[];
  bids$!: Observable<TenderBid[]>;


  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService, 
    private tenderService: TenderService,
    private bidService: BidService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      if(id) {
        this.tenderId=id;
        this.tender$ = this.tenderService.getTenderById(id);
        this.bids$ = this.bidService.getBidsByTenderId(id);
        this.menuItems =  [
    
          {
            label: 'İhale Dosyası',
            icon: 'pi pi-fw pi-file mr-2',
            items: [
              {
                label: 'İhale Dosyaları',
                icon: 'pi pi-fw pi-folder mr-2',
                routerLink: ['/'],
              },
              {
                label: 'Zeyilname (Revizyonlar)',
                icon: 'pi pi-fw pi-plus mr-2',
                
                  
                items: [
                      {
                        label: 'Listele',
                        icon: 'pi pi-fw pi-list mr-2',
                        routerLink: ['/'],
                      },
                      {
                        label: 'Yeni Zeyilname',
                        icon: 'pi pi-fw pi-plus mr-2',
                        routerLink: ['/'],
                      },
                    ],
                  
          
                
              },
            ],
          },
          {
            label: 'Teklifler',
            icon: 'pi pi-fw pi-file mr-2',
            items: [{
              label: 'Listele',
              icon: 'pi pi-fw pi-file mr-2',
              routerLink: [`ihale/ihale/${this.tenderId || '1'}/teklifler`],
            }]
            
          },
          {
            label: 'Fiyat Karşılaştırma',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Bütçe Fiyatı',
                icon: 'pi pi-fw pi-user-plus mr-2',
                routerLink: [`/ihale/${this.tenderId || '1'}/butce`],
              },
              {
                label: 'Yeni Tablo',
                icon: 'pi pi-fw pi-user-plus mr-2',
                routerLink: [`ihale/ihale/${this.tenderId || '1'}/teklifler`],
              },
              {
                label: 'Tablolar',
                icon: 'pi pi-fw pi-user-plus mr-2',
                routerLink: ['/'],
              },
            ],
          },
      
          {
            label: 'Firma Raporları',
            icon: 'pi pi-fw pi-power-off',
            
          },
          {
            label: 'Soru Cevap',
            icon: 'pi pi-fw pi-user-plus mr-2',
            routerLink: ['/'],
          },
          {
            label: 'Toplantılar',
            icon: 'pi pi-fw pi-user-plus mr-2',
            routerLink: ['/'],
          },
        ];
      }
  });
    this.menuService.setItems(this.menuItems);
  }

  ngOnDestroy() {
    this.menuService.setItems([]);
  }
}

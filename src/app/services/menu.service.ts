import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _items = new BehaviorSubject<MenuItem[]>([]);
  items$ = this._items.asObservable();
  
  

  setItems(tenderId: string) {
    const menuItems =  [
    
      {
        label: 'İhale Dosyası',
        icon: 'pi pi-fw pi-folder mr-2',
        items: [
          {
            label: 'İhale Dosyaları',
            icon: 'pi pi-fw pi-folder-open mr-2',
            routerLink: ['/'],
          },
          {
            label: 'Zeyilname (Revizyonlar)',
            icon: 'pi pi-fw pi-wallet mr-2',
            routerLink: ['/'],
              
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
        icon: 'pi pi-fw pi-money-bill mr-2',
        routerLink: [`ihale/ihale/${tenderId || '1'}/teklifler`],
        items: [{
          label: 'Listele',
          icon: 'pi pi-fw pi-list mr-2',
          routerLink: [`ihale/ihale/${tenderId || '1'}/teklifler`],
        }]
        
      },
      {
        label: 'Fiyat Karşılaştırma',
        icon: 'pi pi-fw pi-chart-bar mr-2',
        routerLink: [`/ihale/${tenderId || '1'}/karsilastirma-tablolari`],
        items: [
          {
            label: 'Bütçe Fiyatı',
            icon: 'pi pi-fw pi-calculator mr-2',
            routerLink: [`/ihale/${tenderId || '1'}/butce`],
          },
          {
            label: 'Yeni Tablo',
            icon: 'pi pi-fw pi-plus mr-2',
            routerLink: [`ihale/ihale/${tenderId || '1'}/teklifler`],
          },
          {
            label: 'Tablolar',
            icon: 'pi pi-fw pi-database mr-2',
            routerLink: [`/ihale/${tenderId || '1'}/karsilastirma-tablolari`],
          },
        ],
      },
  
      {
        label: 'Firma Raporları',
        icon: 'pi pi-fw pi-chart-line mr-2',
        
      },
      {
        label: 'Soru Cevap',
        icon: 'pi pi-fw pi-question mr-2',
        routerLink: ['/'],
      },
      {
        label: 'Toplantılar',
        icon: 'pi pi-fw pi-users mr-2',
        routerLink: ['/toplantilar'],
      },
    ];
    this._items.next(menuItems);
  }

  clearItems() {
    this._items.next([]);
  }


}

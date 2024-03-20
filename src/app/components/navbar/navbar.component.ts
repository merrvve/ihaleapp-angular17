import { Component, OnInit } from '@angular/core';
import {  MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { ɵBrowserAnimationBuilder } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenuModule, ButtonModule, MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  userMenu: MenuItem[] | undefined;
ngOnInit(): void {
  this.items = [
    {
        label: 'Ana Sayfa',
        icon: 'pi pi-fw pi-home',
        routerLink: [('/')]
    },
    {
        label: 'İhalelerim',
        icon: 'pi pi-fw pi-file',
        items: [
            {
                label: 'Yeni İhale',
                icon: 'pi pi-fw pi-plus',
                routerLink: [('ihale/ihale-olustur')]
                
            },
            {
                label: 'Listele',
                icon: 'pi pi-fw pi-list',
                items: [
                  {
                      label: 'Tümünü Listele',
                      icon: 'pi pi-fw pi-bookmark',
                      routerLink: [('ihale/listele')]
                  },
                  {
                      label: 'Örnek İhale',
                      icon: 'pi pi-fw pi-server'
                  }
              ]
            },
            {
                separator: true
            },
            {
                label: 'Taslaklar',
                icon: 'pi pi-fw pi-external-link',
                routerLink: [('ihale/taslaklar')]
            }
        ]
    },
    {
        label: 'Firmalar / Teklifçiler',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'Yeni Teklifçi',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: [('teklifci/olustur')]
            },
            {
                label: 'Listele',
                icon: 'pi pi-fw pi-list',
                items: [
                  {
                      label: 'Tümünü Listele',
                      icon: 'pi pi-fw pi-users',
                      routerLink: [('teklifci/listele')]
                      
                  },
                  {
                      icon: 'pi pi-fw pi-verified',
                      label: 'Firma X',
                      items: [
                        {
                            label: 'Yetkili Ekle',
                            icon: 'pi pi-fw pi-user-plus',
                            routerLink: [('teklifci/{id}/yetkili-ekle')]
                        }
                    ]
                  }
              ]
            }
        ]
    },
    
    {
        label: 'Çıkış Yap',
        icon: 'pi pi-fw pi-power-off'
    }
];
this.userMenu = [
  {
      label: 'Hesap Bilgilerim',
      icon: 'pi pi-fw pi-user',
  },
  {
      label: 'Çıkış Yap',
      icon: 'pi pi-fw pi-power-off'
  }
];
}
isLoggedIn: boolean = true;
}

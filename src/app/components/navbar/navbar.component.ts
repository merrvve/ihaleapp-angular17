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
                label: 'Export',
                icon: 'pi pi-fw pi-external-link'
            }
        ]
    },
    {
        label: 'Firmalar / Teklifçiler',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'Yeni Teklifçi',
                icon: 'pi pi-fw pi-user-plus'
            },
            {
                label: 'Listele',
                icon: 'pi pi-fw pi-list',
                items: [
                  {
                      label: 'Tümünü Listele',
                      icon: 'pi pi-fw pi-users',
                      
                  },
                  {
                      icon: 'pi pi-fw pi-verified',
                      label: 'Firma X',
                      items: [
                        {
                            label: 'Yetkili Ekle',
                            icon: 'pi pi-fw pi-user-plus'
                        }
                    ]
                  }
              ]
            }
        ]
    },
    {
        label: 'Geçmiş',
        icon: 'pi pi-fw pi-calendar',
        items: [
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Save',
                        icon: 'pi pi-fw pi-calendar-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-calendar-minus'
                    }
                ]
            },
            {
                label: 'Archieve',
                icon: 'pi pi-fw pi-calendar-times',
                items: [
                    {
                        label: 'Remove',
                        icon: 'pi pi-fw pi-calendar-minus'
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

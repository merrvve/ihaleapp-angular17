import { Component, OnInit } from '@angular/core';
import {  MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

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
  isLoggedIn: boolean = false;

  constructor(public auth: AuthService) {  }
  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(
        {next: (result)=> this.isLoggedIn=result,
        error: (error)=> console.log(error)}
    );
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
                    label: 'İhalelerim',
                    icon: 'pi pi-fw pi-list',
                    routerLink: [('ihale/listele')],
                    
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
                    routerLink: [('teklif/teklifci/ekle')]
                },
                {
                    label: 'Listele',
                    icon: 'pi pi-fw pi-list',
                    items: [
                    {
                        label: 'Tüm Teklifçiler',
                        icon: 'pi pi-fw pi-users',
                        routerLink: [('teklif/teklifci/listele')]
                        
                    },
                    {
                        label: 'Tüm Firmalar',
                        icon: 'pi pi-fw pi-verified',
                        routerLink: [('teklif/firmalar')]
                        
                    }
                ]
                }
            ]
        },
        
        {
            label: 'Çıkış Yap',
            icon: 'pi pi-fw pi-power-off',
            command(event) {
                this['this.auth'].logout()
            },
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
}

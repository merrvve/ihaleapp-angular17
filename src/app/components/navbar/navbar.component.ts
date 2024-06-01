import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.interface';
import { MenuTemplateComponent } from "../../features/home/menu-template/menu-template.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [MenuModule, ButtonModule, MenubarModule, MenuTemplateComponent]
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  userMenu: MenuItem[] | undefined;
  teklifciMenu: MenuItem[] | undefined;
  isLoggedIn: boolean = false;
  user!: User;

  constructor(public auth: AuthService) {}
  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe({
      next: (result) => {
        this.isLoggedIn = result;
        // user bilgilerini al

        this.auth.user$.subscribe({
          next: (result) => {
            this.user = result;
          },
          error: (error) => console.log(error),
        });
      },
      error: (error) => console.log(error),
    });

    this.items = [
      {
        label: 'Ana Sayfa',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
      },
      {
        label: 'İhalelerim',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Yeni İhale',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['ihale/ihale-olustur'],
          },
          {
            label: 'İhalelerim',
            icon: 'pi pi-fw pi-list',
            routerLink: ['ihale/listele'],
          },
          {
            separator: true,
          },
          {
            label: 'Taslaklar',
            icon: 'pi pi-fw pi-external-link',
            routerLink: ['ihale/taslaklar'],
          },
        ],
      },
      {
        label: 'Firmalar / Teklifçiler',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Yeni Teklifçi',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: ['teklif/teklifci/ekle'],
          },
          {
            label: 'Listele',
            icon: 'pi pi-fw pi-list',
            items: [
              {
                label: 'Tüm Teklifçiler',
                icon: 'pi pi-fw pi-users',
                routerLink: ['teklif/teklifci/listele'],
              },
              {
                label: 'Tüm Firmalar',
                icon: 'pi pi-fw pi-verified',
                routerLink: ['teklif/firmalar'],
              },
            ],
          },
        ],
      },

      {
        label: 'Çıkış Yap',
        icon: 'pi pi-fw pi-power-off',
        command: (event: any) => {
          this.auth.logout();
        },
      },
    ];
    this.userMenu = [
      {
        label: 'Hesap Bilgilerim',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Çıkış Yap',
        icon: 'pi pi-fw pi-power-off',
        command: (event: any) => {
          this.auth.logout();
        },
      },
    ];
    this.teklifciMenu = [
      {
        label: 'Ana Sayfa',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
      },
      {
        label: 'İhalelerim',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'İhalelerim',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/teklifci/ihalelerim']
          },
          {
            separator: true,
          },
          {
            label: 'Tekliflerim',
            icon: 'pi pi-fw pi-external-link',
            routerLink: ['/teklifci/tekliflerim']
           
          },
        ],
      },

      {
        label: 'Çıkış Yap',
        icon: 'pi pi-fw pi-power-off',
        command: (event: any) => {
          this.auth.logout();
        },
      },
    ];
  }
}

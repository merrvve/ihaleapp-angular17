import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenuTemplateComponent } from "../../features/home/menu-template/menu-template.component";
import { FirebaseAuthService } from '../../services/firebaseauth.service';
import { Observable } from 'rxjs/internal/Observable';
import { UserDetail } from '../../models/user-detail.interface';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [MenuModule, ButtonModule, MenubarModule, MenuTemplateComponent, AsyncPipe]
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  userMenu: MenuItem[] | undefined;
  teklifciMenu: MenuItem[] | undefined;
  isLoggedIn: boolean = false;
  user$!: Observable<UserDetail | null>;
  
  constructor(public auth: FirebaseAuthService,
  ) {}
  
  ngOnInit(): void {
    this.user$ =  this.auth.userDetails$;

    this.items = [
      {
        label: 'Ana Sayfa',
        icon: 'pi pi-fw pi-home mr-2',
        routerLink: ['/'],
      },
      {
        label: 'İhalelerim',
        icon: 'pi pi-fw pi-folder mr-2',
        routerLink: ['ihale/listele'],
        items: [
          {
            label: 'Yeni İhale',
            icon: 'pi pi-fw pi-plus mr-2',
            routerLink: ['ihale/ihale-olustur'],
          },
          {
            label: 'İhalelerim',
            icon: 'pi pi-fw pi-list mr-2',
            routerLink: ['ihale/listele'],
          },
          {
            label: 'Taslaklar',
            icon: 'pi pi-fw pi-external-link  mr-2',
            routerLink: ['ihale/taslaklar'],
          },
        ],
      },
      {
        label: 'Firmalar/Teklifçiler',
        icon: 'pi pi-fw pi-user mr-2',
        routerLink: ['teklif/firmalar'],
        items: [
      
              {
                label: 'Firma Yetkilileri',
                icon: 'pi pi-fw pi-users mr-2',
                routerLink: ['teklif/teklifci/listele'],
              },
              {
                label: 'Tüm Firmalar',
                icon: 'pi pi-fw pi-verified mr-2',
                routerLink: ['teklif/firmalar'],
              }
            
         
        ],
      },

      {
        label: 'Çıkış Yap',
        icon: 'pi pi-fw pi-power-off mr-2',
        command: () => {
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
        command: () => {
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
            icon: 'pi pi-fw pi-list mr-2',
            routerLink: ['/teklifci/ihalelerim']
          },
          {
            separator: true,
          },
          {
            label: 'Tekliflerim',
            icon: 'pi pi-fw pi-external-link mr-2',
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

import { Component, Input, ViewChild } from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
@Component({
  selector: 'app-menu-template',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule,MenuModule, MenubarModule,BadgeModule,
  
  ],
  templateUrl: './menu-template.component.html',
  styleUrl: './menu-template.component.scss'
})
export class MenuTemplateComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  checked=true;
  sidebarVisible: boolean = false;
  @Input() items!: MenuItem[] |undefined;
  @Input() userMenu!: MenuItem[] |undefined;

  
  

  closeCallback(e:any): void {
      this.sidebarRef.close(e);
  }

  
}

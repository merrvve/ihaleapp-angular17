import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ThemeService } from '../../../services/theme.service';
import { Observable } from 'rxjs/internal/Observable';
import { MenuService } from '../../../services/menu.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu-template',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule,MenuModule, MenubarModule,BadgeModule,
    AsyncPipe
  ],
  templateUrl: './menu-template.component.html',
  styleUrl: './menu-template.component.scss'
})
export class MenuTemplateComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  themeToggle=false;
  sidebarVisible: boolean = false;
  @Input() items!: MenuItem[] |undefined;
  @Input() userMenu!: MenuItem[] |undefined;
  extraItems$! : Observable<MenuItem[]>;


  constructor(private themeService: ThemeService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.extraItems$ = this.menuService.items$;
  }


  switchTheme(): void {
    this.themeToggle=!this.themeToggle;
    this.themeService.switchTheme();
  }

  closeCallback(e:any): void {
      this.sidebarRef.close(e);
  }

  
}

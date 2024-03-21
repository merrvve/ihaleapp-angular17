import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-teklifciler',
  standalone: true,
  imports: [TableModule,ButtonModule, BreadcrumbModule],
  templateUrl: './teklifciler.component.html',
  styleUrl: './teklifciler.component.scss'
})
export class TeklifcilerComponent {
  teklifciler: any[] = [{id:'1', adi:'merve',soyadi:'keskin',firma:'firma adi'}];
  selectTeklifci(teklifci: any) {}
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit() {
      this.items = [{ label: 'Ana Sayfa' }, { label: 'Teklifçiler' }, { label: 'Listele' }];

      this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}

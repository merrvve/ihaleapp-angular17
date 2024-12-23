import { Route } from '@angular/router';
import { TeklifciIhaleleriComponent } from './teklifci-ihaleleri/teklifci-ihaleleri.component';
import { TeklifciTeklifleriComponent } from './teklifci-teklifleri/teklifci-teklifleri.component';
import { TeklifBilgileriComponent } from './teklif-olustur/teklif-bilgileri/teklif-bilgileri.component';
import { KesifComponent } from './teklif-olustur/kesif/kesif.component';
import { TeklifciComponent } from '../dashboard/teklifci/teklifci.component';
import { TeklifOzetComponent } from './teklif-olustur/teklif-ozet/teklif-ozet.component';
import { TableComponent } from '../table/table.component';
import { IhaleDetayComponent } from './teklifci-ihaleleri/ihale-detay/ihale-detay.component';

export const TEKLIFCI_ROUTES: Route[] = [
  {
    path: 'teklif-olustur',
    children: [
      { path: 'teklif-bilgileri', component: TeklifBilgileriComponent },
      { path: 'kesif', component: KesifComponent },
      { path: 'teklif-ozet', component: TeklifOzetComponent },
      { path: '', redirectTo: 'teklif-bilgileri', pathMatch: 'full' },
    ],
  },
  { path: 'ihalelerim',
    children: [
      { path: 'listele', component: TeklifciIhaleleriComponent  },
      { path: ':id/detay', component: IhaleDetayComponent },
      { path: '', redirectTo: 'listele', pathMatch: 'full' },
    ]
    },
  { path: 'tekliflerim', component: TeklifciTeklifleriComponent },
  { path: 'ihale/:id/tekliflerim', component: TeklifciTeklifleriComponent },
  { path: 'dashboard', component: TeklifciComponent },
  { path: 'kesif-detay', component: TableComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

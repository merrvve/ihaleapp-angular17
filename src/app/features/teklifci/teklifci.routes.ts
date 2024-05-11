import { Route } from '@angular/router';
import { TeklifciIhaleleriComponent } from './teklifci-ihaleleri/teklifci-ihaleleri.component';
import { TeklifciTeklifleriComponent } from './teklifci-teklifleri/teklifci-teklifleri.component';
import { TeklifBilgileriComponent } from './teklif-olustur/teklif-bilgileri/teklif-bilgileri.component';
import { KesifComponent } from './teklif-olustur/kesif/kesif.component';
import { TeklifciComponent } from '../dashboard/teklifci/teklifci.component';

export const TEKLIFCI_ROUTES: Route[] = [
  {
    path: 'teklif-olustur',
    children: [
      { path: 'teklif-bilgileri', component: TeklifBilgileriComponent },
      { path: 'kesif', component: KesifComponent },
      { path: '', redirectTo: 'teklif-bilgileri', pathMatch: 'full' },
    ],
  },
  { path: 'ihalelerim', component: TeklifciIhaleleriComponent },
  { path: 'tekliflerim', component: TeklifciTeklifleriComponent },
  { path: 'dashboard', component: TeklifciComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

import { Route } from '@angular/router';
import { KesifOlusturComponent } from './ihale-olustur/kesif-olustur/kesif-olustur.component';
import { IstenenDokumanlarComponent } from './ihale-olustur/istenen-dokumanlar/istenen-dokumanlar.component';
import { TeklifciEklemeComponent } from './ihale-olustur/teklifci-ekleme/teklifci-ekleme.component';
import { IhaleBilgileriComponent } from './ihale-olustur/ihale-bilgileri/ihale-bilgileri.component';
import { IhaleListeleComponent } from './ihale-listele/ihale-listele.component';
import { IhaleDetayComponent } from './ihale-detay/ihale-detay.component';
import { TamamlaComponent } from './ihale-olustur/tamamla/tamamla.component';

export const IHALE_ROUTES: Route[] = [
  {
    path: 'ihale-olustur',
    children: [
      { path: 'kesif-olustur', component: KesifOlusturComponent },
      { path: 'istenen-dokumanlar', component: IstenenDokumanlarComponent },
      { path: 'teklifci-ekleme', component: TeklifciEklemeComponent },
      { path: 'ihale-bilgileri', component: IhaleBilgileriComponent },
      { path: 'tamamla', component: TamamlaComponent },
      { path: '', redirectTo: 'ihale-bilgileri', pathMatch: 'full' },
    ],
  },
  { path: 'ihale/:id', component: IhaleDetayComponent },
  { path: 'listele', component: IhaleListeleComponent },
  { path: '', redirectTo: 'listele', pathMatch: 'full' },
      
];

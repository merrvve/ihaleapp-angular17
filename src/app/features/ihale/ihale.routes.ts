import { Route } from '@angular/router';
import { KesifOlusturComponent } from './ihale-olustur/kesif-olustur/kesif-olustur.component';
import { IstenenDokumanlarComponent } from './ihale-olustur/istenen-dokumanlar/istenen-dokumanlar.component';
import { TeklifciEklemeComponent } from './ihale-olustur/teklifci-ekleme/teklifci-ekleme.component';
import { IhaleBilgileriComponent } from './ihale-olustur/ihale-bilgileri/ihale-bilgileri.component';
import { IhaleListeleComponent } from './ihale-listele/ihale-listele.component';
import { IhaleDetayComponent } from './ihale-detay/ihale-detay.component';
import { TamamlaComponent } from './ihale-olustur/tamamla/tamamla.component';
import { IhaleTeklifleriComponent } from './ihale-detay/ihale-teklifleri/ihale-teklifleri.component';
import { KesifDetayComponent } from './ihale-detay/ihale-teklifleri/kesif-detay/kesif-detay.component';
import { IhaleKarsilastirComponent } from './ihale-karsilastir/ihale-karsilastir.component';
import { TaslaklarComponent } from './ihale-listele/taslaklar/taslaklar.component';
import { CreateBudgetComponent } from './budget/create-budget/create-budget.component';
import { FirmaTeklifleriComponent } from './ihale-detay/ihale-teklifleri/firma-teklifleri/firma-teklifleri.component';


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
  { path: 'ihale/:id/teklifler', component: IhaleTeklifleriComponent },
  { path: 'ihale/:id/teklifler/firma/:firmaid', component: FirmaTeklifleriComponent },
  { path: 'kesif-detay', component: KesifDetayComponent},
  { path: 'listele', component: IhaleListeleComponent },
  { path: 'taslaklar', component: TaslaklarComponent },
  { path: 'karsilastir', component: IhaleKarsilastirComponent },
  { path: ':id/butce', component: CreateBudgetComponent },
  { path: '', redirectTo: 'listele', pathMatch: 'full' },
      
];

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
import { ListCompareTablesComponent } from './ihale-karsilastir/list-compare-tables/list-compare-tables.component';
import { IhaleDosyalariComponent } from './ihale-detay/ihale-dosyalari/ihale-dosyalari.component';
import { RevizyonlarComponent } from './ihale-detay/revizyonlar/revizyonlar.component';
import { FirmaRaporlariComponent } from './ihale-detay/firma-raporlari/firma-raporlari.component';
import { RaporAyarComponent } from './ihale-detay/firma-raporlari/rapor-ayar/rapor-ayar.component';
import { RaporOlusturComponent } from './ihale-detay/firma-raporlari/rapor-olustur/rapor-olustur.component';
import { SoruCevapComponent } from './ihale-detay/soru-cevap/soru-cevap.component';
import { ToplantilarComponent } from './ihale-detay/toplantilar/toplantilar.component';
import { RaporViewComponent } from './ihale-detay/firma-raporlari/rapor-olustur/rapor-view/rapor-view.component';
import { YeniToplantiComponent } from './ihale-detay/toplantilar/yeni-toplanti/yeni-toplanti.component';
import { TeklifDetayiComponent } from './ihale-detay/ihale-teklifleri/teklif-detayi/teklif-detayi.component';

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
  { path: 'ihale/:id/ihale-detay', component: IhaleBilgileriComponent },
  { path: 'ihale/:id/dosyalar', component: IhaleDosyalariComponent },
  { path: 'ihale/:id/revizyonlar', component: RevizyonlarComponent },
  { path: 'ihale/:id/teklifler', component: IhaleTeklifleriComponent },
  { path: 'ihale/:id/teklifler/:teklifid', component: TeklifDetayiComponent },
  { path: 'ihale/:id/teklifler/:teklifid/kesif-detay', component: KesifDetayComponent },
  {
    path: 'ihale/:id/teklifler/firma/:firmaid',
    component: FirmaTeklifleriComponent,
  },
  { path: 'ihale/:id/firma-raporlari', component: FirmaRaporlariComponent },
  { path: 'ihale/:id/firma-raporlari/ayarlar', component: RaporAyarComponent },
  {
    path: 'ihale/:id/firma-raporlari/rapor-olustur',
    component: RaporOlusturComponent,
  },
  {
    path: 'ihale/:id/firma-raporlari/rapor-onizleme',
    component: RaporViewComponent,
  },
  { path: 'ihale/:id/soru-cevap', component: SoruCevapComponent },
  { path: 'ihale/:id/toplantilar', component: ToplantilarComponent },
  {
    path: 'ihale/:id/toplantilar/yeni-toplanti',
    component: YeniToplantiComponent,
  },
  { path: 'kesif-detay', component: KesifDetayComponent },
  { path: 'listele', component: IhaleListeleComponent },
  { path: 'taslaklar', component: TaslaklarComponent },
  { path: 'karsilastir', component: IhaleKarsilastirComponent },
  {
    path: 'ihale/:id/karsilastirma-tablolari',
    component: ListCompareTablesComponent,
  },
  { path: 'ihale/:id/butce', component: CreateBudgetComponent },
  { path: 'ihale/:id/ihale-dosyalari', component: IhaleDosyalariComponent },
  {
    path: 'ihale/:id/ihale-dosyalari/yeni-zeyilname',
    component: RevizyonlarComponent,
  },
  { path: '', redirectTo: 'listele', pathMatch: 'full' },
];

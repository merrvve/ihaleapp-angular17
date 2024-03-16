import { Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';
import { IhaleOlusturComponent } from './features/ihale/ihale-olustur/ihale-olustur.component';
import { DashboardComponent } from './features/home/dashboard/dashboard.component';
import { KesifOlusturComponent } from './features/ihale/ihale-olustur/kesif-olustur/kesif-olustur.component';
import { DokumanlarComponent } from './features/ihale/ihale-olustur/dokumanlar/dokumanlar.component';
import { IstenenDokumanlarComponent } from './features/ihale/ihale-olustur/istenen-dokumanlar/istenen-dokumanlar.component';
import { TeklifciEklemeComponent } from './features/ihale/ihale-olustur/teklifci-ekleme/teklifci-ekleme.component';
import { IhaleBilgileriComponent } from './features/ihale/ihale-olustur/ihale-bilgileri/ihale-bilgileri.component';
import { IhaleListeleComponent } from './features/ihale/ihale-listele/ihale-listele.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'ihale', children: [
        {path:'ihale-olustur', component: IhaleOlusturComponent, children: [
            {path:'kesif-olustur', component: KesifOlusturComponent},
            {path:'dokumanlar', component: DokumanlarComponent},
            {path:'istenen-dokumanlar', component: IstenenDokumanlarComponent},
            {path:'teklifci-ekleme', component: TeklifciEklemeComponent},
            {path:'ihale-bilgileri', component: IhaleBilgileriComponent},
        ]},
        {path: 'listele', component: IhaleListeleComponent},
        {path: '', redirectTo:'listele', pathMatch:'full' }
    ]},
    {path:'', component: DashboardComponent}
];

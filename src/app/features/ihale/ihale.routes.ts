import { Route } from "@angular/router";
import { KesifOlusturComponent } from "./ihale-olustur/kesif-olustur/kesif-olustur.component";
import { DokumanlarComponent } from "./ihale-olustur/dokumanlar/dokumanlar.component";
import { IstenenDokumanlarComponent } from "./ihale-olustur/istenen-dokumanlar/istenen-dokumanlar.component";
import { TeklifciEklemeComponent } from "./ihale-olustur/teklifci-ekleme/teklifci-ekleme.component";
import { IhaleBilgileriComponent } from "./ihale-olustur/ihale-bilgileri/ihale-bilgileri.component";
import { IhaleListeleComponent } from "./ihale-listele/ihale-listele.component";

// In admin/routes.ts:
export const IHALE_ROUTES: Route[] = [
    
        {path:'ihale-olustur', children: [
            {path:'kesif-olustur', component: KesifOlusturComponent},
            {path:'dokumanlar', component: DokumanlarComponent},
            {path:'istenen-dokumanlar', component: IstenenDokumanlarComponent},
            {path:'teklifci-ekleme', component: TeklifciEklemeComponent},
            {path:'ihale-bilgileri', component: IhaleBilgileriComponent},
            {path:'', redirectTo:'ihale-bilgileri', pathMatch:'full'}
        ]},
        {path: 'listele', component: IhaleListeleComponent},
        {path: '', redirectTo:'listele', pathMatch:'full' }
    
  ];
import { Route } from "@angular/router";
import { TeklifcilerComponent } from "./teklifciler/teklifciler.component";
import { TeklifciEkleComponent } from "./teklifci-ekle/teklifci-ekle.component";
import { FirmalarComponent } from "./firmalar/firmalar.component";

export const TEKLIF_ROUTES: Route[] = [
    
    {path:'teklifci', children: [
        {path:'listele', component: TeklifcilerComponent},
        {path:'ekle', component: TeklifciEkleComponent},
        {path:'', redirectTo:'listele', pathMatch:'full'}
    ]},
    {path: 'firmalar', component: FirmalarComponent},
    {path: '', redirectTo:'teklifci', pathMatch:'full' }

];
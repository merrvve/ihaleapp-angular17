import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeklifOlusturComponent } from "../teklif-olustur.component";

@Component({
    selector: 'app-teklif-bilgileri',
    standalone: true,
    templateUrl: './teklif-bilgileri.component.html',
    styleUrl: './teklif-bilgileri.component.scss',
    imports: [RouterLink, TeklifOlusturComponent]
})
export class TeklifBilgileriComponent {

}

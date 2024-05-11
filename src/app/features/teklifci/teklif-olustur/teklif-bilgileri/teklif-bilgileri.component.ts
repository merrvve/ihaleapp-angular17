import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeklifOlusturComponent } from "../teklif-olustur.component";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TeklifciService } from '../../../../services/teklifci.service';
import { Ihale } from '../../../../models/ihale.interface';

@Component({
    selector: 'app-teklif-bilgileri',
    standalone: true,
    templateUrl: './teklif-bilgileri.component.html',
    styleUrl: './teklif-bilgileri.component.scss',
    imports: [RouterLink, TeklifOlusturComponent, FormsModule,
        ButtonModule,
        FileUploadModule,
    ]
})
export class TeklifBilgileriComponent implements OnInit {
    ihale! :Ihale;
    constructor(private teklifciService: TeklifciService) {}
    ngOnInit(): void {
        this.ihale=this.teklifciService.ihale;
    }

}

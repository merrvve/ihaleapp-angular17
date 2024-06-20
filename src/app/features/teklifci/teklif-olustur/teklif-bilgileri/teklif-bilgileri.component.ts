import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeklifOlusturComponent } from "../teklif-olustur.component";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TeklifciService } from '../../../../services/teklifci.service';
import { Ihale } from '../../../../models/ihale.interface';
import { BidService } from '../../../../services/bid.service';
import { Tender } from '../../../../models/tender';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';

interface Dokuman {
    id: number;
    name: string;
    type: string;
}

@Component({
    selector: 'app-teklif-bilgileri',
    standalone: true,
    templateUrl: './teklif-bilgileri.component.html',
    styleUrl: './teklif-bilgileri.component.scss',
    imports: [RouterLink, TeklifOlusturComponent, FormsModule,
        ButtonModule,
        FileUploadModule,
        AsyncPipe
    ]
})
export class TeklifBilgileriComponent implements OnInit {
    ihale! :Ihale;
    selectedFiles : File[] = [];

    tender$!: Observable<Tender|null>;
    constructor(private teklifciService: TeklifciService,
        private bidService: BidService
    ) {}
    ngOnInit(): void {
        this.tender$  = this.bidService.tender$;
    }

    onFileChange(event: any) {
        if (event.target.files) {
          for (const file of event.target.files) {
            this.selectedFiles.push(file);
          }
        }
      }
    
    ngOnDestroy() {
        this.teklifciService.files = this.selectedFiles;
    }

}

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeklifOlusturComponent } from "../teklif-olustur.component";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TeklifciService } from '../../../../services/teklifci.service';
import { Ihale } from '../../../../models/ihale.interface';

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
    ]
})
export class TeklifBilgileriComponent implements OnInit {
    ihale! :Ihale;
    documents : Dokuman[] = [];
    selectedFiles : File[] = [];
    constructor(private teklifciService: TeklifciService) {}
    ngOnInit(): void {
        this.ihale=this.teklifciService.ihale;
        let docString = this.ihale.istenen_dokumanlar
        let i = 0
        if (docString) {
            let docs = docString.split('||')
            console.log(docs)
            for (const doc of docs) {
                if(doc.includes('|')) {
                    let docSplit = doc.split('|');
                    console.log(doc,docSplit)
                    this.documents.push({
                        id: i,
                        name: docSplit[0],
                        type: docSplit[1]
                    })
                    i ++;
                }             
            }
        }
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

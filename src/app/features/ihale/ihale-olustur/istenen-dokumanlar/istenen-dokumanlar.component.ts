import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { IhaleOlusturComponent } from '../ihale-olustur.component';

import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { RequestedDocument } from '../../../../models/requested-document';
import { TenderService } from '../../../../services/tender.service';

@Component({
  selector: 'app-istenen-dokumanlar',
  standalone: true,
  imports: [
    MessagesModule,
    ButtonModule,
    RouterLink,
    IhaleOlusturComponent,
    RadioButtonModule,
    FormsModule,
  ],
  templateUrl: './istenen-dokumanlar.component.html',
  styleUrl: './istenen-dokumanlar.component.scss',
})
export class IstenenDokumanlarComponent implements OnInit {
  radioChoice!: string;
  messages: Message[] = []; // bilgilendirme mesajı
  requestedDocs: RequestedDocument[] = [];
  id: number = 0;
  isEditMode!: boolean;
  constructor(private tenderService: TenderService) {}

  ngOnInit(): void {
    this.isEditMode = this.tenderService._currentTender.value.isEditMode;
    //mesajları oluştur
    this.messages = [
      {
        severity: 'info',
        summary: 'Teklifçilerden İstenen Dökümanlar',
        detail:
          'Bu adımda teklifçilerin göndermesi gereken dökümanları belirleyebilirsiniz.',
      },
    ];

    //evraklar varsa yükle
    this.requestedDocs =
      this.tenderService._currentTender.value.requestedDocuments;
  }

  addDoc(name: string, format: string) {
    const id = Date.now();
    this.requestedDocs.push({ name: name, format: format, id: id });
  }

  deleteDoc(id: number) {
    const index = this.requestedDocs.findIndex((x) => x.id == id);
    if (index > -1) {
      this.requestedDocs.splice(index, 1);
    }
  }

  ngOnDestroy() {
    this.tenderService._currentTender.value.requestedDocuments =
      this.requestedDocs;
    // let evraklarString = '';
    // for (const evrak of this.evraklar) {
    //   evraklarString += evrak.evrak + '|' + evrak.bicim + '||';
    // }
    // this.ihaleService.istenenDokumanlarEkle(evraklarString);
    // this.ihaleService.evraklar = this.evraklar;
  }
}

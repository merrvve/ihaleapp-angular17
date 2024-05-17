import { Message } from 'primeng/api/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';
import { TeklifciService } from '../../../services/teklifci.service';
import { FirmaYetkilisi } from '../../../models/firmayetkilisi.interface';
import { Firma } from '../../../models/firma.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teklifci-ekle',
  standalone: true,
  imports: [MessagesModule, ButtonModule, FormsModule],
  templateUrl: './teklifci-ekle.component.html',
  styleUrl: './teklifci-ekle.component.scss',
})
export class TeklifciEkleComponent implements OnInit {
  messages: Message[] = []; // bilgilendirme mesajı
  teklifci: FirmaYetkilisi = {
    id: 0,
    firma: 0,
    adi: '',
    soyadi: '',
    email: '',
    telefon: '',
  };
  firma: Firma = {
    id: 0,
    firma_adi: '',
    vergi_no: '',
    islem_kategorisi: '',
  };
  constructor(private teklifciService: TeklifciService) {}
  ngOnInit(): void {
    //mesajları oluştur
    this.messages = [
      {
        severity: 'info',
        summary: 'Teklifçi Ekleme',
        detail:
          'Lütfen Teklifçi eklemek için gerekli bilgileri doldurup "Ekle" butonuna tıklayınız.',
      },
    ];
  }
  teklifciEkle() {
    this.teklifciService
      .createFirmaYetkilisiAndFirma(this.firma, this.teklifci)
      .subscribe({
        next: (result) => {
          this.messages = [
            {
              severity: 'success',
              summary: 'Teklifçi Eklendi',
              detail: 'Teklifçi başarıyla eklendi.',
            },
          ];
          this.firma = {
            id: 0,
            firma_adi: '',
            vergi_no: '',
            islem_kategorisi: '',
          };
          this.teklifci = {
            id: 0,
            firma: 0,
            adi: '',
            soyadi: '',
            email: '',
            telefon: '',
          };
        },

        error: (error) =>
          (this.messages = [
            {
              severity: 'error',
              summary: 'Teklifçi Eklenenmedi',
              detail: 'Teklifçi eklenirken bir hatayla karşılaşıldı. ' + error,
            },
          ]),
      });
  }
}

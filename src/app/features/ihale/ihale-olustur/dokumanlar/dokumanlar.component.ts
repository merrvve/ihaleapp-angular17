import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/api/message';
import { IhaleOlusturComponent } from '../ihale-olustur.component';

@Component({
  selector: 'app-dokumanlar',
  standalone: true,
  imports: [
    FileUploadModule,
    MessagesModule,
    ButtonModule,
    RouterLink,
    IhaleOlusturComponent,
  ],
  templateUrl: './dokumanlar.component.html',
  styleUrl: './dokumanlar.component.scss',
})
export class DokumanlarComponent implements OnInit {
  messages: Message[] = []; // bilgilendirme mesajı

  ngOnInit(): void {
    //mesajları oluştur
    this.messages = [
      {
        severity: 'info',
        summary: 'Dökümanlar',
        detail:
          'Bu adımda teklifçilerin indirebileceği ihale döküman dosyalarını yükleyebilirsiniz.',
      },
    ];
  }
}

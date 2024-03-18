import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { IhaleOlusturComponent } from '../ihale-olustur.component';

@Component({
  selector: 'app-istenen-dokumanlar',
  standalone: true,
  imports: [MessagesModule, ButtonModule,RouterLink, IhaleOlusturComponent],
  templateUrl: './istenen-dokumanlar.component.html',
  styleUrl: './istenen-dokumanlar.component.scss'
})
export class IstenenDokumanlarComponent implements OnInit {
  messages: Message[] =[]; // bilgilendirme mesajı

  ngOnInit(): void {
     //mesajları oluştur
     this.messages = [
      { severity: 'info', summary: 'Teklifçilerden İstenen Dökümanlar', 
      detail: 'Bu adımda teklifçilerin göndermesi gereken dökümanları belirleyebilirsiniz.' },
    ];
  }
}

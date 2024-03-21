import { Message } from 'primeng/api/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teklifci-ekle',
  standalone: true,
  imports: [MessagesModule, ButtonModule],
  templateUrl: './teklifci-ekle.component.html',
  styleUrl: './teklifci-ekle.component.scss'
})
export class TeklifciEkleComponent  implements OnInit {
  messages: Message[] =[]; // bilgilendirme mesajı

  ngOnInit(): void {
     //mesajları oluştur
     this.messages = [
      { severity: 'info', summary: 'Teklifçi Ekleme', 
      detail: 'Lütfen Teklifçi eklemek için gerekli bilgileri doldurup "\Ekle"\ butonuna tıklayınız.' },
    ];
  }
}

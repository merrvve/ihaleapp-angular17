import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { IhaleOlusturComponent } from '../ihale-olustur.component';

@Component({
  selector: 'app-teklifci-ekleme',
  standalone: true,
  imports: [MessagesModule, ButtonModule,RouterLink, IhaleOlusturComponent],
  templateUrl: './teklifci-ekleme.component.html',
  styleUrl: './teklifci-ekleme.component.scss'
})
export class TeklifciEklemeComponent implements OnInit {
  messages: Message[] =[]; // bilgilendirme mesajı

  ngOnInit(): void {
     //mesajları oluştur
     this.messages = [
      { severity: 'info', summary: 'Teklifçi Ekleme', 
      detail: 'Bu adımda listeden teklifçi seçebilir ya da yeni teklifçi oluşturabilirsiniz.' },
    ];
  }
}

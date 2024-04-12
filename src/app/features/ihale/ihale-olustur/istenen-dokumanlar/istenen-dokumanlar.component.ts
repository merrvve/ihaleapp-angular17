import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { IhaleOlusturComponent } from '../ihale-olustur.component';

interface TalepEdilenEvrak {
  id: number;
  evrak: string;
  bicim: string;
}

@Component({
  selector: 'app-istenen-dokumanlar',
  standalone: true,
  imports: [MessagesModule, ButtonModule,RouterLink, IhaleOlusturComponent],
  templateUrl: './istenen-dokumanlar.component.html',
  styleUrl: './istenen-dokumanlar.component.scss'
})
export class IstenenDokumanlarComponent implements OnInit {
  messages: Message[] =[]; // bilgilendirme mesajı
  evraklar: TalepEdilenEvrak[] = [];
  id: number = 0;
  ngOnInit(): void {
     //mesajları oluştur
     this.messages = [
      { severity: 'info', summary: 'Teklifçilerden İstenen Dökümanlar', 
      detail: 'Bu adımda teklifçilerin göndermesi gereken dökümanları belirleyebilirsiniz.' },
    ];
  }

  evrakEkle(evrak: string, bicim: string) {
    this.evraklar.push({evrak:evrak, bicim:bicim, id:this.id})
    this.id += 1;
  }

  evrakSil(id: number) {
    const index = this.evraklar.findIndex(x=>x.id==id);
    if(index>-1) {
      this.evraklar.splice(index,1);
    }
  }
}

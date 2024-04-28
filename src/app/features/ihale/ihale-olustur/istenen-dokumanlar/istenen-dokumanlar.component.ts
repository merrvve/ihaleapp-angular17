import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { IhaleService } from '../../../../services/ihale.service';
import { TalepEdilenEvrak } from '../../../../models/talepedilenevrak.interface';

import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-istenen-dokumanlar',
  standalone: true,
  imports: [MessagesModule, ButtonModule,RouterLink, IhaleOlusturComponent, RadioButtonModule, FormsModule],
  templateUrl: './istenen-dokumanlar.component.html',
  styleUrl: './istenen-dokumanlar.component.scss'
})
export class IstenenDokumanlarComponent implements OnInit {

  radioChoice!: string;
  messages: Message[] =[]; // bilgilendirme mesajı
  evraklar: TalepEdilenEvrak[] = [];
  id: number = 0;

  constructor(private ihaleService: IhaleService){}

  ngOnInit(): void {
     //mesajları oluştur
     this.messages = [
      { severity: 'info', summary: 'Teklifçilerden İstenen Dökümanlar', 
      detail: 'Bu adımda teklifçilerin göndermesi gereken dökümanları belirleyebilirsiniz.' },
    ];

    //evraklar varsa yükle
    this.evraklar = this.ihaleService.evraklar;
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

  ngOnDestroy() {
    let evraklarString = ""
    for(const evrak of this.evraklar) {
      evraklarString += evrak.evrak + "|" + evrak.bicim + "||"; 
    }
    this.ihaleService.istenenDokumanlarEkle(evraklarString);
    this.ihaleService.evraklar = this.evraklar;
  }
}

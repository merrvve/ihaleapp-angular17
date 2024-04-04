import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { TeklifciService } from '../../../../services/teklifci.service';
import { FirmaYetkilisi } from '../../../../models/firmayetkilisi.interface';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { PickListModule } from 'primeng/picklist';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-teklifci-ekleme',
  standalone: true,
  imports: [MessagesModule, ButtonModule,RouterLink, IhaleOlusturComponent, TableModule, PickListModule, DragDropModule],
  templateUrl: './teklifci-ekleme.component.html',
  styleUrl: './teklifci-ekleme.component.scss'
})
export class TeklifciEklemeComponent implements OnInit {
  messages: Message[] =[]; // bilgilendirme mesajı
  teklifciler: FirmaYetkilisi[] = [];
  secilenTeklifciler: FirmaYetkilisi[] = [];
  subscription1!: Subscription;
  constructor(private teklifciService: TeklifciService) {}
  ngOnInit(): void {
    // Teklifçi bilgilerini al
    this.subscription1 = this.teklifciService.getYetkililer().subscribe(
      {
        next: (result) => {this.teklifciler=result; console.log(this.teklifciler)},
        error: (error) => this.messages= [{severity: 'error', summary: 'Teklifçi Bilgileri Alınamadı', 
        detail: 'Teklifçi bilgileri yüklenirken bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyiniz.'}]
      }
    );
     //mesajları oluştur
     this.messages = [
      { severity: 'info', summary: 'Teklifçi Ekleme', 
      detail: 'Bu adımda listeden teklifçi seçebilir ya da yeni teklifçi oluşturabilirsiniz.' },
    ];
  }


  teklifciSec() {
    console.log(this.secilenTeklifciler)
  }
  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

}

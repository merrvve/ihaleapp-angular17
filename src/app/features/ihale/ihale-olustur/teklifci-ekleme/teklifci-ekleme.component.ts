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
import { IhaleService } from '../../../../services/ihale.service';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-teklifci-ekleme',
  standalone: true,
  imports: [MessagesModule, ButtonModule,RouterLink, IhaleOlusturComponent, TableModule, PickListModule,
     DragDropModule, DialogModule, ProgressSpinnerModule],
  templateUrl: './teklifci-ekleme.component.html',
  styleUrl: './teklifci-ekleme.component.scss'
})
export class TeklifciEklemeComponent implements OnInit {
  messages: Message[] =[]; // bilgilendirme mesajı
  messages2: Message[] =[]; // bilgilendirme mesajı
  teklifciler: FirmaYetkilisi[] = [];
  secilenTeklifciler: FirmaYetkilisi[] = [];
  subscription1!: Subscription;
  isModalVisible: boolean = false;
  isLoading: boolean = false;

    
  constructor(private teklifciService: TeklifciService, private ihaleService: IhaleService) {}
  ngOnInit(): void {
    // Teklifçi bilgilerini al
    this.subscription1 = this.teklifciService.getYetkililer().subscribe(
      {
        next: (result) => {this.teklifciler=result; },
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


  ngOnDestroy() {
    let teklifciler: number[] = [];
    for(const teklifci of this.secilenTeklifciler) {
      teklifciler.push(teklifci.id)
    }
    this.ihaleService.teklifcilerEkle(teklifciler);
    this.subscription1.unsubscribe();
  }

  onSubmit() {
    this.isLoading=true;
    this.isModalVisible=true;
    let teklifciler: number[] = [];
    for(const teklifci of this.secilenTeklifciler) {
      teklifciler.push(teklifci.id)
    }
    this.ihaleService.teklifcilerEkle(teklifciler);
     this.ihaleService.createIhale().subscribe({
       next:(result)=>{
        this.messages2= [{severity: 'success', summary: 'İhale Oluşturuldu', 
        detail: 'İhale başarıyla oluşturuldu. '}
      ];
        const id = result.ihale_id;
        const formData = this.ihaleService.getFileFormData();
        this.ihaleService.uploadFile(formData,id).subscribe(
          {
            next:(result)=>{
               this.isLoading=false;
               this.messages2=[{severity: 'success', summary: 'İhale Dökümanları Yüklendi', 
        detail: 'İhale oluşturuldu ve ihale dökümanları başarıyla yüklendi '}];
            },
            error: (error)=>{
              this.isLoading=false;
              this.messages2=[{severity: 'error', summary: 'İhale Dökümanları Yüklenemedi', 
       detail: 'İhale oluşturuldu ancak İhale dökümanları yüklenirken bir hata oluştu. '+ error.message}];
              console.log(error)
           }

          }
        );
       },
       error:(error)=> {this.isLoading=false;
        this.messages2= [{severity: 'error', summary: 'İhale Oluşturulamadı', 
        detail: 'İhale oluşturulurken bir hata ile karşılaşıldı. '+error.message}]
       },
       
   });
  }  
  showDialog() {
    this.isModalVisible = true;
}

}

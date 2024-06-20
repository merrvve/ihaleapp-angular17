import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { TeklifOlusturComponent } from "../teklif-olustur.component";
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { TeklifciService } from '../../../../services/teklifci.service';
import { BidService } from '../../../../services/bid.service';

@Component({
    selector: 'app-kesif',
    standalone: true,
    templateUrl: './kesif.component.html',
    styleUrl: './kesif.component.scss',
    imports: [TableComponent, TeklifOlusturComponent, ButtonModule, RouterLink, DialogModule, ProgressSpinnerModule, MessagesModule]
})
export class KesifComponent implements OnInit{

  isLoading: boolean = false;
  isTeklifModalVisible: boolean = false;
  messages!: Message[];
  error: boolean = false;

  constructor(private teklifciService: TeklifciService, private router: Router,
    private bidService:BidService
  ){}
  ngOnInit(): void {
    
  }
  createBid() {
    this.bidService.createBid()
  }
  teklifVer(){
    this.isLoading=true;
    this.isTeklifModalVisible=true;
    this.teklifciService.createTeklif().subscribe({
      next:(result)=> {console.log(result),
        this.isLoading=false;
         this.messages= [{severity: 'success', summary: 'Teklif Oluşturuldu',
          detail: 'Verdiğiniz teklif başarıyla kaydedildi.'}];
          const formData = this.teklifciService.getFileFormData();
          if(result.id) {
            this.teklifciService.uploadFile(formData,result.id).subscribe({
              next:(result)=> { 
                this.messages= [{severity: 'success', summary: 'Teklif Oluşturuldu',
              detail: 'Verdiğiniz teklif başarıyla kaydedildi ve ilişkili dosyalar yüklendi'}];},
              error:(error)=>{ 
                this.messages= [{severity: 'error', summary: 'Dosyalar yüklenemedi',
              detail: 'Verdiğiniz teklif başarıyla kaydedildi ve ancak ilişkili dosyalar sunucuya yüklenemedi.'}];}
            })
          }
        this.error = false;
      },
      error:(error)=> {console.log(error),
        this.isLoading=false;
        this.messages= [{severity: 'error', summary: 'Teklif Oluşturulamadı',
        detail: 'Teklif oluşturulurken bir hata ile karşılaşıldı. '+ error.message}];
        this.error = true;
      }
    })
  }

  completed() {
    this.isTeklifModalVisible=false;
    if(!this.error){
      this.router.navigate(['/teklifci'])
    }
  }
}

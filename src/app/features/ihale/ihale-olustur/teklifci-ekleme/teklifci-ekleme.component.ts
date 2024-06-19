import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { TeklifciService } from '../../../../services/teklifci.service';
import { FirmaYetkilisi } from '../../../../models/firmayetkilisi.interface';
import { TableModule } from 'primeng/table';
import { Observable, Subscription } from 'rxjs';
import { PickListModule } from 'primeng/picklist';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IhaleService } from '../../../../services/ihale.service';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TeklifciEkleComponent } from "../../../teklif/teklifci-ekle/teklifci-ekle.component";
import { TenderService } from '../../../../services/tender.service';
import { UserDetail } from '../../../../models/user-detail.interface';
import { BidderService } from '../../../../services/bidder.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-teklifci-ekleme',
    standalone: true,
    templateUrl: './teklifci-ekleme.component.html',
    styleUrl: './teklifci-ekleme.component.scss',
    imports: [
        MessagesModule,
        ButtonModule,
        RouterLink,
        IhaleOlusturComponent,
        TableModule,
        PickListModule,
        DragDropModule,
        DialogModule,
        ProgressSpinnerModule,
        TeklifciEkleComponent,
        AsyncPipe
    ]
})
export class TeklifciEklemeComponent implements OnInit {
  messages: Message[] = []; // bilgilendirme mesajı
  messages2: Message[] = []; // bilgilendirme mesajı
  teklifciler: FirmaYetkilisi[] = [];
  secilenTeklifciler: FirmaYetkilisi[] = [];
  subscription1!: Subscription;
  isModalVisible: boolean = false;
  isLoading: boolean = false;
isTeklifciModalVisible: boolean = false;
  bidders$!: Observable<UserDetail[]>;
  selectedBidders: UserDetail[] = [];

  constructor(
    private teklifciService: TeklifciService,
    private ihaleService: IhaleService,
    private tenderService: TenderService,
    private bidderService: BidderService
  ) {}
  ngOnInit(): void {
    // Teklifçi bilgilerini al
    this.bidders$=this.bidderService.getBidders();
   
    //mesajları oluştur
    this.messages = [
      {
        severity: 'info',
        summary: 'Teklifçi Ekleme',
        detail:
          'Bu adımda listeden teklifçi seçebilir ya da yeni teklifçi oluşturabilirsiniz.',
      },
    ];
  }

  ngOnDestroy() {
    }

  onSubmit() {
    this.isLoading = true;
    this.isModalVisible = true;
    let bidders: string[] = [];
    for (const bidder of this.selectedBidders) {
      bidders.push(bidder.uid);
    }
    this.createTender();
    //this.ihaleService.teklifcilerEkle(teklifciler);
    // this.ihaleService.createIhale().subscribe({
    //   next: (result) => {
    //     this.messages2 = [
    //       {
    //         severity: 'success',
    //         summary: 'İhale Oluşturuldu',
    //         detail: 'İhale başarıyla oluşturuldu. ',
    //       },
    //     ];
    //     const id = result.ihale_id;
    //     const formData = this.ihaleService.getFileFormData();
    //     this.ihaleService.uploadFile(formData, id).subscribe({
    //       next: (result) => {
    //         this.isLoading = false;
    //         this.messages2 = [
    //           {
    //             severity: 'success',
    //             summary: 'İhale Dökümanları Yüklendi',
    //             detail:
    //               'İhale oluşturuldu ve ihale dökümanları başarıyla yüklendi ',
    //           },
    //         ];
    //       },
    //       error: (error) => {
    //         this.isLoading = false;
    //         this.messages2 = [
    //           {
    //             severity: 'error',
    //             summary: 'İhale Dökümanları Yüklenemedi',
    //             detail:
    //               'İhale oluşturuldu ancak İhale dökümanları yüklenirken bir hata oluştu. ' +
    //               error.message,
    //           },
    //         ];
    //         console.log(error);
    //       },
    //     });
    //   },
    //   error: (error) => {
    //     this.isLoading = false;
    //     this.messages2 = [
    //       {
    //         severity: 'error',
    //         summary: 'İhale Oluşturulamadı',
    //         detail:
    //           'İhale oluşturulurken bir hata ile karşılaşıldı. ' +
    //           error.message,
    //       },
    //     ];
    //   },
    // });
  }
  showDialog() {
    this.isModalVisible = true;
  }

  createTender() {
    this.tenderService.createTender();
  }
}

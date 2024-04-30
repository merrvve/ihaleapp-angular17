import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeklifciService } from '../../../services/teklifci.service';
import { Firma } from '../../../models/firma.interface';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-firmalar',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './firmalar.component.html',
  styleUrl: './firmalar.component.scss',
})
export class FirmalarComponent implements OnInit {
  subscription1!: Subscription;
  firmalar: Firma[] = [];
  constructor(private teklifciService: TeklifciService) {}
  // Teklifçi bilgilerini al

  ngOnInit() {
    this.subscription1 = this.teklifciService.getFirmalar().subscribe({
      next: (result) => {
        this.firmalar = result;
        console.log(this.firmalar);
      },
      error: (error) => console.log(error),
      //this.messages= [{severity: 'error', summary: 'Teklifçi Bilgileri Alınamadı',
      //detail: 'Teklifçi bilgileri yüklenirken bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyiniz.'}]
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs/internal/Subscription';
import { TeklifciService } from '../../../services/teklifci.service';
import { FirmaYetkilisi } from '../../../models/firmayetkilisi.interface';

@Component({
  selector: 'app-teklifciler',
  standalone: true,
  imports: [TableModule,ButtonModule],
  templateUrl: './teklifciler.component.html',
  styleUrl: './teklifciler.component.scss'
})
export class TeklifcilerComponent implements OnInit{
  selectTeklifci(teklifci: any) {}
  teklifciler : FirmaYetkilisi[] = [];
  subscription1!: Subscription;
  constructor(private teklifciService: TeklifciService) {}
    // Teklifçi bilgilerini al
  
  ngOnInit() {

    this.subscription1 = this.teklifciService.getYetkililer().subscribe(
      {
        next: (result) => {this.teklifciler=result; console.log(this.teklifciler)},
        error: (error) => console.log(error)
        //this.messages= [{severity: 'error', summary: 'Teklifçi Bilgileri Alınamadı', 
        //detail: 'Teklifçi bilgileri yüklenirken bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyiniz.'}]
      }
    );
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}

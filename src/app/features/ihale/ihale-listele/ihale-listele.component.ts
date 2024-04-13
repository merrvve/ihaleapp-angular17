import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IhaleService } from '../../../services/ihale.service';
import { Subscription } from 'rxjs';
import { Ihale } from '../../../models/ihale.interface';

@Component({
  selector: 'app-ihale-listele',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './ihale-listele.component.html',
  styleUrl: './ihale-listele.component.scss'
})
export class IhaleListeleComponent implements OnInit{
ihaleler: Ihale[] = [];
subscription1!: Subscription;
selectIhale(ihale: any) {}
constructor(private ihaleService: IhaleService) {}

ngOnInit() {

  this.subscription1 = this.ihaleService.getIhaleler().subscribe(
    {
      next: (result) => {this.ihaleler=result; console.log(this.ihaleler)},
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

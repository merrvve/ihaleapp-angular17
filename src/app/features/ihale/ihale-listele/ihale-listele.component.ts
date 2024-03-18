import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ihale-listele',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './ihale-listele.component.html',
  styleUrl: './ihale-listele.component.scss'
})
export class IhaleListeleComponent {
ihaleler: any[] = [{id:'1', adi:'Örnek',tarih:'12-12-12',link:'...'}];
selectIhale(ihale: any) {}
}

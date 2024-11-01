import { Component, Input } from '@angular/core';
import { TenderBid } from '../../../models/tender-bid';

@Component({
  selector: 'app-teklif-detay',
  standalone: true,
  imports: [],
  templateUrl: './teklif-detay.component.html',
  styleUrl: './teklif-detay.component.scss'
})
export class TeklifDetayComponent {
  @Input() bid!: TenderBid;
}

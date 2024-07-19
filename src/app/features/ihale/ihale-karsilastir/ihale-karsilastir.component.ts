import { Component, Input } from '@angular/core';
import { TenderBid } from '../../../models/tender-bid';

@Component({
  selector: 'app-ihale-karsilastir',
  standalone: true,
  imports: [],
  templateUrl: './ihale-karsilastir.component.html',
  styleUrl: './ihale-karsilastir.component.scss'
})
export class IhaleKarsilastirComponent {
  bids! : TenderBid[];
}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BidService } from '../../../../services/bid.service';

@Component({
  selector: 'app-teklif-ozet',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './teklif-ozet.component.html',
  styleUrl: './teklif-ozet.component.scss',
})
export class TeklifOzetComponent {
  constructor(
    private router: Router,
    private bidService: BidService,
  ) {}
  ngOnInit(): void {}
  createBid() {
    this.bidService.createBid()?.subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error),
    });
  }
}

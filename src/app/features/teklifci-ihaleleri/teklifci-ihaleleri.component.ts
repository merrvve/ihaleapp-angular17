import { Component, OnInit } from '@angular/core';
import { Ihale } from '../../models/ihale.interface';
import { Subscription } from 'rxjs';
import { TeklifciService } from '../../services/teklifci.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-teklifci-ihaleleri',
  standalone: true,
  imports: [TableModule,ButtonModule],
  templateUrl: './teklifci-ihaleleri.component.html',
  styleUrl: './teklifci-ihaleleri.component.scss'
})
export class TeklifciIhaleleriComponent implements OnInit {
  ihaleler: Ihale[] = [];
  subscription1!: Subscription;
  teklifVer(ihale: Ihale) {}
  constructor(private teklifciService: TeklifciService) {}

  ngOnInit() {
    this.subscription1 = this.teklifciService.getTeklifciIhaleleri().subscribe({
      next: (result) => {
        this.ihaleler = result;
        console.log(this.ihaleler);
      },
      error: (error) => console.log(error),
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}

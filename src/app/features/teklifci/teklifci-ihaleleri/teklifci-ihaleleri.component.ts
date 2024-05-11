import { Component, OnInit } from '@angular/core';
import { Ihale } from '../../../models/ihale.interface';
import { Subscription } from 'rxjs';
import { TeklifciService } from '../../../services/teklifci.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TablodataService } from '../../../services/tablodata.service';
import { Router } from '@angular/router';

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
  constructor(private teklifciService: TeklifciService, private tableService: TablodataService, private router: Router) {}

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

  teklifVer(ihaleId: number) {
    this.teklifciService.getIhaleDetail(ihaleId).subscribe(
      {
        next: (result) => {
          this.tableService.loadData(result.kesif);
          this.teklifciService.teklif.ihale = result.id ? result.id : -1
          this.teklifciService.teklif.kesif = result.kesif
          this.teklifciService.ihale = result
          this.router.navigate(['/teklifci/teklif-olustur'])
        },
        error: (error) => console.log(error)
      }
    )
  }
  
}

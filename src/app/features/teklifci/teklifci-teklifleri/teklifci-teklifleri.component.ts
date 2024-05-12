import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Teklif } from '../../../models/teklif.interface';
import { TeklifciService } from '../../../services/teklifci.service';
import { AsyncPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-teklifci-teklifleri',
  standalone: true,
  imports: [AsyncPipe, TableModule, ButtonModule],
  templateUrl: './teklifci-teklifleri.component.html',
  styleUrl: './teklifci-teklifleri.component.scss'
})
export class TeklifciTeklifleriComponent implements OnInit{
  teklifler$!: Observable<Teklif[]>
  constructor(private teklifciService: TeklifciService) {}
  ngOnInit(): void {
    this.teklifler$ = this.teklifciService.getTeklifciTeklifleri();
  }
  selectTeklif(teklif: Teklif) {
    console.log(teklif)
  }
}

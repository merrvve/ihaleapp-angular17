import { Component, OnInit } from '@angular/core';
import { TeklifciService } from '../../../services/teklifci.service';
import { AuthService } from '../../../services/auth.service';
import { Ihale } from '../../../models/ihale.interface';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe, NgIf } from '@angular/common';
import { Teklif } from '../../../models/teklif.interface';

@Component({
  selector: 'app-teklifci',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './teklifci.component.html',
  styleUrl: './teklifci.component.scss',
})
export class TeklifciComponent implements OnInit {

  ihaleler$! : Observable<Ihale[]>;
  teklifler$! : Observable<Teklif[]>;
  
  ihaleler! : Ihale[];
  constructor(private teklifciService: TeklifciService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
      this.ihaleler$ = this.teklifciService.getTeklifciIhaleleri();
      this.teklifler$ = this.teklifciService.getTeklifciTeklifleri();
      
  }

  ngOnDestroy() {
    
  }
}

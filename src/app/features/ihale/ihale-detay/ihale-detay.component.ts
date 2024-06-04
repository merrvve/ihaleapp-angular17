import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IhaleService } from '../../../services/ihale.service';
import { Ihale } from '../../../models/ihale.interface';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-ihale-detay',
  standalone: true,
  imports: [AsyncPipe, LoadingSpinnerComponent],
  templateUrl: './ihale-detay.component.html',
  styleUrl: './ihale-detay.component.scss'
})
export class IhaleDetayComponent implements OnInit {
  ihale$!: Observable<Ihale>;
  constructor(
    private route: ActivatedRoute,
    private ihaleService: IhaleService 
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      if(id) {
        this.ihale$ = this.ihaleService.getIhaleDetail(+id);
      }
  });
  }
}

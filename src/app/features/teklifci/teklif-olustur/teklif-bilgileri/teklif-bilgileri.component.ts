import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeklifOlusturComponent } from '../teklif-olustur.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { BidService } from '../../../../services/bid.service';
import { Tender } from '../../../../models/tender';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-teklif-bilgileri',
  standalone: true,
  templateUrl: './teklif-bilgileri.component.html',
  styleUrl: './teklif-bilgileri.component.scss',
  imports: [
    RouterLink,
    TeklifOlusturComponent,
    FormsModule,
    ButtonModule,
    FileUploadModule,
    AsyncPipe,
  ],
})
export class TeklifBilgileriComponent implements OnInit {
  selectedFiles: File[] = [];

  tender$!: Observable<Tender | null>;
  constructor(private bidService: BidService) {}
  ngOnInit(): void {
    this.tender$ = this.bidService.tender$;
  }

  onFileChange(event: any) {
    if (event.target.files) {
      for (const file of event.target.files) {
        this.selectedFiles.push(file);
      }
    }
  }

  ngOnDestroy() {}
}

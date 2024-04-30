import { Component, OnInit } from '@angular/core';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { Ihale } from '../../../../models/ihale.interface';
import { IhaleService } from '../../../../services/ihale.service';
import { Subscription } from 'rxjs';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-ihale-bilgileri',
  standalone: true,
  imports: [
    IhaleOlusturComponent,
    RadioButtonModule,
    FormsModule,
    ButtonModule,
    RouterLink,
    FileUploadModule,
    CalendarModule,
  ],
  templateUrl: './ihale-bilgileri.component.html',
  styleUrl: './ihale-bilgileri.component.scss',
})
export class IhaleBilgileriComponent implements OnInit {
  selectedCurrency: string = '';
  currencies = ['TL', 'Dolar', 'Euro'];
  selectedFile!: File;
  selectedFiles: File[] = [];
  firstDate: string | undefined;
  secondDate: Date | undefined;
  ihale!: Ihale;
  subscription1!: Subscription;

  constructor(private ihaleService: IhaleService) {}
  ngOnInit(): void {
    this.selectedFiles = this.ihaleService.files;
    this.subscription1 = this.ihaleService.ihale$.subscribe({
      next: (result) => (this.ihale = result),
      error: (error) => console.log(error),
    });
  }

  onFileChange(event: any) {
    if (event.target.files) {
      for (const file of event.target.files) {
        this.selectedFiles.push(file);
      }
    }
  }

  ngOnDestroy() {
    this.ihaleService.files = this.selectedFiles;
    this.subscription1.unsubscribe();
  }
}

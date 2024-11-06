import { Component, OnInit } from '@angular/core';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { Observable } from 'rxjs';
import { TenderService } from '../../../../services/tender.service';
import { Tender } from '../../../../models/tender';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
import { MessagesService } from '../../../../services/messages.service';

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
    AsyncPipe,
    LoadingSpinnerComponent,
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

  tender$!: Observable<Tender>;

  constructor(private tenderService: TenderService,
    private messageService: MessagesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.tender$ = this.tenderService.currentTender$;
  }

  onFileChange(event: any) {
    if (event.target.files) {
      for (const file of event.target.files) {
        this.selectedFiles.push(file);
      }
    }
  }

  handleForward(tenderName: string) {
    if(tenderName.length<1) {
      this.messageService.showError("Lütfen ihale adı bilgisini giriniz")
    }
    else {
      this.router.navigate(['/ihale/ihale-olustur/kesif-olustur'])
    }
  }

  ngOnDestroy() {}
}

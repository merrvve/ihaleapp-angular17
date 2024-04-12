import { Component } from '@angular/core';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-ihale-bilgileri',
  standalone: true,
  imports: [IhaleOlusturComponent, RadioButtonModule, FormsModule, ButtonModule, RouterLink, FileUploadModule, CalendarModule],
  templateUrl: './ihale-bilgileri.component.html',
  styleUrl: './ihale-bilgileri.component.scss'
})
export class IhaleBilgileriComponent {
  selectedCurrency: string=''
  currencies= ['TL','Dolar','Euro']
  selectedFile!: File;
  selectedFiles: File[] = [];
  uploadedFiles: any[] = [];
  firstDate: Date | undefined;
  secondDate: Date | undefined;

  onFileChange(event: any) {
    if(event.target.files) {
      for(const file of event.target.files) {
        this.selectedFiles.push(file)
      }
    }  
  }


  onUpload(event:any) {
    console.log(event.files)
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
  }
}

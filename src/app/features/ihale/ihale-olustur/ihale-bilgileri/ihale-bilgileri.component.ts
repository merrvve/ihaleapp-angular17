import { Component } from '@angular/core';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-ihale-bilgileri',
  standalone: true,
  imports: [IhaleOlusturComponent, RadioButtonModule, FormsModule, ButtonModule, RouterLink, FileUploadModule],
  templateUrl: './ihale-bilgileri.component.html',
  styleUrl: './ihale-bilgileri.component.scss'
})
export class IhaleBilgileriComponent {
  selectedCurrency: string=''
  currencies= ['TL','Dolar','Euro']
  selectedFile!: File;
  selectedFiles: File[] = [];
  uploadedFiles: any[] = [];


  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles)
  }


  onUpload(event:any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
  }
}

import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string, summary: string = 'Başarılı') {
    this.messageService.add({ severity: 'success', summary, detail: message });
  }

  showError(message: string, summary: string = 'Hata') {
    this.messageService.add({ severity: 'error', summary, detail: message });
  }

  showInfo(message: string, summary: string = 'Bilgi') {
    this.messageService.add({ severity: 'info', summary, detail: message });
  }

  showWarning(message: string, summary: string = 'Uyarı') {
    this.messageService.add({ severity: 'warn', summary, detail: message });
  }
}

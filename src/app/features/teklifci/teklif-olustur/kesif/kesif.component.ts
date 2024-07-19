import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { TeklifOlusturComponent } from "../teklif-olustur.component";
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { TeklifciService } from '../../../../services/teklifci.service';
import { BidService } from '../../../../services/bid.service';

@Component({
    selector: 'app-kesif',
    standalone: true,
    templateUrl: './kesif.component.html',
    styleUrl: './kesif.component.scss',
    imports: [TableComponent, TeklifOlusturComponent, ButtonModule, RouterLink, DialogModule, ProgressSpinnerModule, MessagesModule]
})
export class KesifComponent implements OnInit{
  
  isLoading: boolean = false;
  isTeklifModalVisible: boolean = false;
  messages!: Message[];
  error: boolean = false;

  constructor(private router: Router,
    private bidService:BidService
  ){}
  ngOnInit(): void {
    
  }
  createBid() {
    this.bidService.createBid().subscribe(
     {
      next: (result)=> console.log(result),
      error: (error)=>console.log(error)
     }
    )
  }
  

  completed() {
    this.isTeklifModalVisible=false;
    if(!this.error){
      this.router.navigate(['/teklifci'])
    }
  }

  
}

import { Component } from '@angular/core';
import { TenderService } from '../../../../services/tender.service';
import { Tender } from '../../../../models/tender';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ihale-teklifleri',
  standalone: true,
  imports: [],
  templateUrl: './ihale-teklifleri.component.html',
  styleUrl: './ihale-teklifleri.component.scss'
})
export class IhaleTeklifleriComponent {
  currentTender! : Tender | null;
  constructor(
    private route: ActivatedRoute,
    private tenderService: TenderService) {}
  ngOnInit() {
    this.currentTender = this.tenderService._currentTender.value;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id && id!==this.currentTender?.id ) {
        this.tenderService.getTenderById(id).subscribe({
          next: (result) => {this.currentTender=result}
        }
           
        );
      }
    
    });
    console.log(this.tenderService._currentTender.value);
  }
}

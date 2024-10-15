import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { IhaleOlusturComponent } from '../ihale-olustur.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TenderService } from '../../../../services/tender.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, NgModel } from '@angular/forms';
import { map, Subscription, tap } from 'rxjs';
import { TablodataService } from '../../../../services/tablodata.service';
import { RevisionsService } from '../../../../services/revisions.service';
import { TenderRevision } from '../../../../models/tender';
@Component({
  selector: 'app-kesif-olustur',
  standalone: true,
  imports: [TableComponent, IhaleOlusturComponent, ButtonModule, RouterLink, DropdownModule, FormsModule ],
  templateUrl: './kesif-olustur.component.html',
  styleUrl: './kesif-olustur.component.scss',
})
export class KesifOlusturComponent implements OnInit {
  currency!: string;
  
  selectedRevision!: any;
  tableSubscription!: Subscription;
  tenderId!: string;
  revisions! : TenderRevision[];
  revSubs! : Subscription;

  constructor(private tenderService: TenderService,
    private tableService: TablodataService,
    private revisionsService: RevisionsService
  ) {}
  ngOnInit(): void {
    this.currency = this.tenderService._currentTender.value.currency;
    this.tenderId = this.tenderService._currentTender.value.id;
    this.revisions = [{
      name: "R1",
      created_at: null,
      discoveryData: null
    }]
    if(this.tenderId) {
      
      this.revSubs = this.revisionsService.getAllRevisions(this.tenderId).subscribe(result=>{this.revisions=this.revisions.concat(result);
        console.log(this.revisions)
        if(this.revisions && this.revisions.length>0) {
          const currentId = this.revisionsService.getCurrentRevision().id;
         if(currentId) {
          this.selectedRevision = this.revisions.find(x=>x.id==currentId);
         }
         else {
          this.selectedRevision = this.revisions[0]
          }
        }
        else {
           this.selectedRevision = this.revisions[0]
        }
      })
    }
    else {
       this.selectedRevision = this.revisions[0]
    }
    
    
    
  }

  createRevision() {
    this.tableSubscription = this.tableService.datatree$.subscribe(
      value=> {
        this.tableService.cols$.subscribe(
          cols=> this.tableService.currentData = this.tableService.convertTreeToDatalist(value,cols)
        )
      }
    )
  

  
    let data: { [key: number]: any } = {};
    for (let i = 0; i < this.tableService.currentData.length; i++) {
      data[i] = this.tableService.currentData[i];
    }
    const revName = `R${this.revisions.length+1}`
    if(this.tenderId && this.tenderId!=="") {
      this.revisionsService.createRevision(this.tenderId,data,revName).subscribe(
        {
          next: (revision)=> {
            this.revisions= (this.revisions || []).concat([revision]);
            this.selectedRevision = revision
          },
          error: (error) => {
            console.log(error)
          }
        }
      )
    }
    else {
      console.log("It is a new tender")
    }
    
  }

  ngOnDestroy() {
    if(this.revSubs) {
      this.revSubs.unsubscribe();
    }
    
  }
}

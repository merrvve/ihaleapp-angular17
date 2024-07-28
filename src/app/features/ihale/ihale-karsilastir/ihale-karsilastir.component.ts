import { Component, Input, OnInit } from '@angular/core';
import { TenderBid } from '../../../models/tender-bid';
import { CompareBidsService } from '../../../services/compare-bids.service';
import { TableModule } from 'primeng/table';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-ihale-karsilastir',
  standalone: true,
  imports: [TableModule, JsonPipe],
  templateUrl: './ihale-karsilastir.component.html',
  styleUrl: './ihale-karsilastir.component.scss'
})
export class IhaleKarsilastirComponent implements OnInit {
  tableData!: any[];
  columns!: any[];
  otherCols!: any[];
  tableStyle = {width:"100%"}
  tenderData!: any[];
  constructor(
    private compareService: CompareBidsService
  ){}
  ngOnInit(): void {
    const data= this.compareService.createTableData(this.compareService.compareBids);
    this.columns = data.columns;
    this.tableStyle.width = this.columns.length * 7 +'rem';
    this.tableData = data.tableData;
    this.tenderData = data.tenderData;
    
    this.otherCols=data.otherCols;
    console.log(this.tenderData)
  }
}

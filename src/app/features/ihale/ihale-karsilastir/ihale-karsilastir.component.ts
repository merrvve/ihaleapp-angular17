import { Component, Input, OnInit } from '@angular/core';
import { TenderBid } from '../../../models/tender-bid';
import { CompareBidsService } from '../../../services/compare-bids.service';
import { TableModule } from 'primeng/table';
import { JsonPipe } from '@angular/common';
import { Column } from '../../../models/column.interface';
interface Price {
  title: string;
  bid: number;
  price: number;
}

interface CompareTableRow {
  id: string;
  key: string;
  title: string;
  amount: number;
  unit: string;
  brand: string;
  unitPrices: Price[];
  minUnitPrices: Price[];
  totalPrices: Price[];
}
@Component({
  selector: 'app-ihale-karsilastir',
  standalone: true,
  imports: [TableModule, JsonPipe],
  templateUrl: './ihale-karsilastir.component.html',
  styleUrl: './ihale-karsilastir.component.scss'
})
export class IhaleKarsilastirComponent implements OnInit {
  columns!: Column[];
  tableData! : CompareTableRow[];
  tableStyle = {width:"100%"}
  tenderData!: any[];
  bidsCountArray! : number[];
  constructor(
    private compareService: CompareBidsService
  ){}
  ngOnInit(): void {
    const data= this.compareService.createTableData(this.compareService.compareBids);
    this.columns = data.columns;
    this.tenderData = data.tenderData;
    this.tableData = data.table;
    this.bidsCountArray =  Array.from({ length: data.bidsCount }, (_, index) => index + 1);
    this.tableStyle.width = (this.columns.length *10  +this.bidsCountArray.length * 5) +'rem';
    
    
  }
}

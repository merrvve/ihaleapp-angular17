import { Component, Input, OnInit } from '@angular/core';
import { TenderBid } from '../../../models/tender-bid';
import { CompareBidsService } from '../../../services/compare-bids.service';
import { TableModule } from 'primeng/table';
import { JsonPipe } from '@angular/common';
import { Column } from '../../../models/column.interface';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
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
  imports: [TableModule, MultiSelectModule, FormsModule],
  templateUrl: './ihale-karsilastir.component.html',
  styleUrl: './ihale-karsilastir.component.scss'
})
export class IhaleKarsilastirComponent implements OnInit {
  columns!: Column[];
  tableData! : any[];
  tableStyle = {width:"100%"}
  tenderData!: any[];
  bidsCountArray! : number[];
  colNames : string[] =[];
  data: any [] = [];
  selectedColumns! : Column[];
  constructor(
    private compareService: CompareBidsService
  ){}
  ngOnInit(): void {
    const data= this.compareService.createTableData(this.compareService.compareBids);
    this.columns = data.columns;
    this.tenderData = data.tenderData;
    this.tableData = data.table;
    this.bidsCountArray =  Array.from({ length: data.bidsCount }, (_, index) => index + 1);
    
    
    this.columns.forEach((column,index)=> {
      if(column.isBirim || column.isToplam) {
          this.bidsCountArray.forEach((count)=>{this.colNames.push(column.header + count)})
          
      }
      else {
          this.colNames.push(column.field);
      }
      });
      this.tableStyle.width = (this.colNames.length *10) +'rem';
    
    console.log(this.tableData)
  }
}

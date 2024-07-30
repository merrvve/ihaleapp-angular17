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
  colNames! : string[];
  data: any [] = [];
  selectedColumns! : string[];
  visibleColNames! : string[];
  constructor(
    private compareService: CompareBidsService
  ){}
  ngOnInit(): void {
    const data= this.compareService.createTableData(this.compareService.compareBids);
    this.columns = data.columns;
    this.tenderData = data.tenderData;
    this.tableData = data.table;
    this.bidsCountArray =  Array.from({ length: data.bidsCount }, (_, index) => index + 1);
    this.visibleColNames = [];
    this.colNames= [];
    this.columns.forEach((column,index)=> {
      if(column.isBirim || column.isToplam) {
          this.bidsCountArray.forEach((count)=>{this.colNames.push(column.header + count); this.visibleColNames.push('Teklif '+count )})
          this.colNames.push(column.header+' min')
          this.visibleColNames.push('Minimum')
      }
      else {
          this.colNames.push(column.field);
          this.visibleColNames.push(column.header)
      }
      });
      this.tableStyle.width = (this.colNames.length *10) +'rem';
    this.selectedColumns = this.colNames;
    console.log(this.tableData)
  }

  onColReorder(event: any) {
    // This is called whenever columns are reordered.
    const reorderedColNames = event.columns; // This gives the new order of `colNames`
    
    // Reorder `visibleColNames` based on the new order of `colNames`
    this.visibleColNames = reorderedColNames.map((colName:string )=> {
      const index = this.colNames.indexOf(colName);
      return this.visibleColNames[index];
    });

    // Update `colNames` to match the reordered columns
    this.visibleColNames = reorderedColNames;
  }
}

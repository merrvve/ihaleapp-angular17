import { Component, Input, OnInit } from '@angular/core';
import { TenderBid } from '../../../models/tender-bid';
import { CompareBidsService } from '../../../services/compare-bids.service';
import { TableModule } from 'primeng/table';
import { JsonPipe, NgClass } from '@angular/common';
import { Column } from '../../../models/column.interface';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { CompareColumn } from '../../../models/compare-column.interface';
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
  imports: [TableModule, MultiSelectModule, FormsModule, NgClass],
  templateUrl: './ihale-karsilastir.component.html',
  styleUrl: './ihale-karsilastir.component.scss'
})
export class IhaleKarsilastirComponent implements OnInit {
  columns!: Column[];
  compareColumns!: CompareColumn[];
  tableData! : any[];
  tableStyle = {width:"100%"}
  tenderData!: any[];
  
  data: any [] = [];
  selectedColumns! : CompareColumn[];
  
  bids!: TenderBid[];

  constructor(
    private compareService: CompareBidsService
  ){}
  ngOnInit(): void {
    const data= this.compareService.createTableData(this.compareService.compareBids);
    const colors = ['bg-blue-100','bg-yellow-100','bg-pink-100','bg-purple-100']
    this.columns = data.columns;
    this.tenderData = data.tenderData;
    this.tableData = data.table;
    this.bids = data.bids;
    
    this.compareColumns =[];
    this.columns.forEach((column,index)=> {
      if(column.isBirim || column.isToplam) {
          this.bids.forEach((bid,count)=>{
            this.compareColumns.push({
              field: column.header + (count+1),
              header:'Teklif '+(count+1) ,
              isUnit: column.isBirim,
              isTotal: column.isToplam,
              isAllTotal: column.isAllTotal,
              bid: (count+1),
              color: colors[count]
            })
            })
          
          this.compareColumns.push({
            field: column.header + ' min',
            header:'Minimum' ,
            isUnit: column.isBirim,
            isTotal: column.isToplam,
            isAllTotal: column.isAllTotal,

          });

          
      }
      else {
        this.compareColumns.push({
          field: column.field,
          header: column.header,
          isUnit: column.isBirim,
          isTotal: column.isToplam,
          isAllTotal: column.isAllTotal
        })
          
      }
      });
      this.tableStyle.width = (this.compareColumns.length *7) +'rem';
    this.selectedColumns = this.compareColumns;
    
  }

  
}

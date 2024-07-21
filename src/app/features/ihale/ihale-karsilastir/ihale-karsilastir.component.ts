import { Component, Input, OnInit } from '@angular/core';
import { TenderBid } from '../../../models/tender-bid';
import { CompareBidsService } from '../../../services/compare-bids.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-ihale-karsilastir',
  standalone: true,
  imports: [TableModule],
  templateUrl: './ihale-karsilastir.component.html',
  styleUrl: './ihale-karsilastir.component.scss'
})
export class IhaleKarsilastirComponent implements OnInit {
  tableData!: any[];
  columns!: any[];
  constructor(
    private compareService: CompareBidsService
  ){}
  ngOnInit(): void {
    const data= this.compareService.createTableData(this.compareService.compareBids);
    this.columns = data.columns;
    this.tableData = data.tableData;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { TenderBid } from '../../../models/tender-bid';
import { CompareBidsService } from '../../../services/compare-bids.service';
import { TableModule } from 'primeng/table';
import {  NgClass } from '@angular/common';
import { Column } from '../../../models/column.interface';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule} from '@angular/forms';
import { CompareColumn } from '../../../models/compare-column.interface';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
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
  imports: [TableModule, MultiSelectModule, FormsModule, NgClass, ToggleButtonModule, MenubarModule, DialogModule,
    ButtonModule
  ],
  templateUrl: './ihale-karsilastir.component.html',
  styleUrl: './ihale-karsilastir.component.scss'
})
export class IhaleKarsilastirComponent implements OnInit {
  columns!: Column[];
  compareColumns!: CompareColumn[];
  tableData! : any[];
  tableStyle = {width:"100%"}
  tenderid!: string | undefined;
  tableMenuItems!: MenuItem[];
  
  selectedColumns! : CompareColumn[];
  colExpandValue = 0;
  budegetModalVisible: boolean =false;

  bids!: TenderBid[];
  markMin: boolean = false;
  markMax: boolean = false;

  constructor(
    private compareService: CompareBidsService
  ){}
  ngOnInit(): void {
    const data= this.compareService.createTableData(this.compareService.compareBids);
    const colors = ['bg-blue-100','bg-yellow-100','bg-pink-100','bg-purple-100']
    this.columns = data.columns;
    this.tenderid = data.tenderid;
    this.tableData = data.table;
    this.bids = data.bids;
    
    this.compareColumns =[];
    let idx = 0;
    this.columns.forEach((column,index)=> {
      if(column.isBirim || column.isToplam) {
          this.bids.forEach((bid,count)=>{
            this.compareColumns.push({
              id: idx,
              field: column.header + (count+1),
              header:'Teklif '+(count+1) ,
              isUnit: column.isBirim,
              isTotal: column.isToplam,
              isAllTotal: column.isAllTotal,
              bid: (count+1),
              color: colors[count]
            }); 
            idx +=1;
            })
          
          this.compareColumns.push({
            id:idx,
            field: column.header + ' min',
            header:'Minimum' ,
            isUnit: column.isBirim,
            isTotal: column.isToplam,
            isAllTotal: column.isAllTotal,
            color: 'bg-green-100'

          });
          idx+=1;
          this.compareColumns.push({
            id: idx,
            field: column.header + ' max',
            header:'Maksimum' ,
            isUnit: column.isBirim,
            isTotal: column.isToplam,
            isAllTotal: column.isAllTotal,
            color: 'bg-red-100'

          });

          idx +=1;
          this.compareColumns.push({
            id: idx,
            field: column.header + ' avg',
            header:'Ortalama' ,
            isUnit: column.isBirim,
            isTotal: column.isToplam,
            isAllTotal: column.isAllTotal,
            color: 'bg-teal-50'

          });

          idx +=1;
          this.compareColumns.push({
            id: idx,
            field: column.header + ' budget',
            header:'Bütçe' ,
            isUnit: column.isBirim,
            isTotal: column.isToplam,
            isAllTotal: column.isAllTotal,
            color: 'bg-primary-50'

          });

          idx +=1;
      }
      else {
        this.compareColumns.push({
          id: idx,
          field: column.field,
          header: column.header,
          isUnit: column.isBirim,
          isTotal: column.isToplam,
          isAllTotal: column.isAllTotal
        });
        idx+=1;
          
      }
      });
     
    this.selectedColumns = this.compareColumns.filter(x=>x.header!=='Minimum' && x.header!=='Maksimum' && x.header!=='Ortalama'  && x.header!=='Bütçe');
    this.colExpandValue = 0;
    console.log(this.selectedColumns);
    this.tableStyle.width = (this.selectedColumns.length *7) +'rem';
    this.tableMenuItems = [
      {
        label: 'Dosya',
        icon: 'pi pi-folder-open',
        items: [
          {
            label: 'Kaydet',
            icon: 'pi pi-save',
          },
          {
            label: 'Yazdır',
            icon: 'pi pi-print',
            command: () => this.printTable(),
          }
        ]
      },
      {
          label: 'Sütun Ekle',
          icon: 'pi pi-plus-circle',
          items: [
            {
              label: 'Minimum',
              icon: 'pi pi-file-import',
              command: () => this.AddCol('Minimum'),
            },
            {
              label: 'Maksimum',
              icon: 'pi pi-file-export',
              command: () => this.AddCol('Maksimum'),
            },
            {
              label: 'Ortalama Değer',
              icon: 'pi pi-calculator',
              command: () => this.AddCol('Ortalama'),
            },
            {
              label: 'Bütçe',
              icon: 'pi pi-calculator',
              items: [
                {
                  label: 'Bütçeyi Göster',
                  icon: 'pi pi-eye',
                  command: () => this.AddCol('Bütçe'),
                },
                {
                  label: 'Bütçeyi Düzenle',
                  icon: 'pi pi-file-edit',
                  disabled: true,
                  //command: () => this.AddCol('Bütçe'),
                },
                {
                  label: 'Yeni Bütçe Oluştur',
                  icon: 'pi pi-plus',
                  routerLink: ['/','ihale', this.tenderid,'butce']
                  //command: () => this.AddCol('Minimum'),
                },
                ]
            }
          ]
      },
      {
        label: 'İşaretle',
          icon: 'pi pi-file-edit',
          items: [
            {
              label: 'Minimum',
              icon: 'pi pi-angle-double-down',
              command: () => {this.markMin=true; this.markFields(this.tableData,this.compareColumns,0)},
          },
          {
            label: 'Maksimum',
            icon: 'pi pi-angle-double-up',
            command: () => {this.markMax=true; this.markFields(this.tableData,this.compareColumns,1)},
        },
        ]
      },
      {
        label: 'Ayarlar',
        icon: 'pi pi-wrench',
        items: [
          {
            label: 'Para Birimi',
            icon: 'pi pi-money-bill',
            items: [
              {
                label: 'Dolar',
                icon: 'pi pi-dollar',
                //command: () => this.printTable(),
              },
              {
                label: 'Euro',
                icon: 'pi pi-euro',
                //command: () => this.printTable(),
              },
              {
                label: 'Türk Lirası',
                icon: 'pi pi-turkish-lira',
                //command: () => this.printTable(),
              },
            ]
          }
        ]
      }
      
     ];
     
     
  }

  markFields(rows:any[],columns: CompareColumn[],choice:number) {
    // Mark fileds
    /* Choices:
        0: min,
        1: max,
        2:... 
    */
   if(choice===0) {
    if(this.markMin) {
      for(const row of rows) {
        for (const column of columns) {
          if(column.isUnit || column.isTotal) {
            //field name minus numbers + min
            const minName = column.field.replace(/\d+$/, '') + ' min';
            if(row[column.field]===row[minName]) {
              row[column.field + 'mark'] = 'bg-green-200';
            }
          }
        }
      }
      return;
    }
    else {
    
      this.unMarkAll(rows,columns);
      return;
    }
   }
    
   if(choice===1) {
    if(this.markMax) {
      for(const row of rows) {
        for (const column of columns) {
          if(column.isUnit || column.isTotal) {
            //field name minus numbers + min
            const minName = column.field.replace(/\d+$/, '') + ' max';
            if(row[column.field]===row[minName]) {
              row[column.field + 'mark'] = 'bg-red-200';
            }
          }
        }
      }
      return;
    }
    else {
    
      this.unMarkAll(rows,columns);
      return;
    }
   }
  }
  unMarkAll(rows:any[], columns:CompareColumn[], markToDelete?: string) {
    for(const row of rows) {
      for (const column of columns) {
        if(row[column.field + 'mark']) {
          if(markToDelete) {
            if(row[column.field + 'mark']===markToDelete) {
              row[column.field + 'mark']='';
            }
          }
          else{
            row[column.field + 'mark']='';
          }
          
        }
      }
    }
  }

  AddCol(colType: string) {
    
  this.selectedColumns = this.selectedColumns.concat(this.compareColumns.filter(x=>x.header===colType)) 
  this.colExpandValue +=1;
  this.selectedColumns.sort((a,b)=>a.id-b.id);
   this.tableStyle.width = (this.selectedColumns.length *8) +'rem';
  }

  colReorder() {
    this.selectedColumns.sort((a,b)=>a.id-b.id);
  }

  printTable() {
    const printContent = document.querySelector('.card')?.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow?.document.write('<html><head><title>Print Table</title>');
    printWindow?.document.write('<style>');
    printWindow?.document.write(`
      .card {
        font-family: Arial, sans-serif;
        font-size: 12px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      th {
        background-color: #f2f2f2;
      }
    `);
    printWindow?.document.write('</style></head><body>');
    printWindow?.document.write(printContent||'');
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuItem, Message, TreeNode } from 'primeng/api';
import { TablodataService } from '../../../../services/tablodata.service';
import { Column } from '../../../../models/column.interface';
import { MessagesModule } from 'primeng/messages';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IhaleOlusturComponent } from '../ihale-olustur.component';





@Component({
  selector: 'app-kesif-olustur',
  standalone: true,
  imports: [MessagesModule, MenuModule, ToolbarModule, MultiSelectModule, 
    FormsModule, ButtonModule, TreeTableModule, InputNumberModule,
   ContextMenuModule, NgClass, InputTextModule, DialogModule, RouterLink, IhaleOlusturComponent],
  templateUrl: './kesif-olustur.component.html',
  styleUrl: './kesif-olustur.component.scss'
})

export class KesifOlusturComponent implements OnInit {
  
  files!: TreeNode[]; // tüm tablo
  cols!: Column[]; // tüm sütun nesneleri
  colNames: string[] = []; // tüm sütun adları

  selectedColumns!: Column[]; // görüntülenecek sütunlar

  selectedNode!: TreeNode; // sağ tuşla seçilen node

  rowContextItems!: MenuItem[]; //Tablo üzerinde sağ tuşla gelen menü
  addColItems!: MenuItem[]; //Sütun Ekle Menüsü

  messages: Message[] =[]; // bilgilendirme mesajı

  
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

  constructor(private dataService: TablodataService) {}

  ngOnInit(): void {
    // verileri yükle
    this.colNames = this.dataService.ornekData[0];
    this.cols = this.dataService.columns(this.dataService.ornekData); 
    this.selectedColumns = this.cols;
    this.files = this.dataService.convertToTreeTable(this.dataService.ornekData); 
    // menüleri oluştur

    this.rowContextItems = [
      { label: 'Satır Ekle', icon: 'pi pi-arrow-down', command: (event) => this.addRowToNode(this.selectedNode) },
      { label: 'Başlık Ekle', icon: 'pi pi-file-edit', command: (event) => this.addNewNode() },
      { label: 'Satırı Sil', icon: 'pi pi-trash', command: (event) => this.deleteNode(this.selectedNode) }
    ];

    this.addColItems = [
    { label: 'Malzeme Birim Fiyat', icon: 'pi pi-shopping-bag', command: (event) => this.addBirimCol('Malzeme')  },
    { label: 'İşçilik Birim Fiyat', icon: 'pi pi-id-card', command: (event) => this.addBirimCol('İşçilik') },
    { label: 'Diğer Birim Fiyat', icon: 'pi pi-calculator', command: (event) => this.addBirimCol() },
    { label: 'Diğer Sütun', icon: 'pi pi-server', command: (event) => this.showDialog() }
    ];


    //mesajları oluştur
    this.messages = [
      { severity: 'info', summary: 'Keşif Oluşturma', detail: 'Tablo üzerinde değişiklik yapmak için sağ tuşa tıklayarak açılan menüyü kullanabilirsiniz.' },
    ];
  }

  addRowToNode(node: TreeNode) {
    this.dataService.addRowToNode(node);
    this.updateView();
    this.expandAllNodes(this.files);
  }

  addNewNode() {
    this.dataService.addNewNode(this.files);
    this.updateView();
    this.expandAllNodes(this.files);
  }

  deleteNode(selectedNode: TreeNode<any>): void {
    throw new Error('Method not implemented.');
  }
 
  
  addOtherCol(name: string) {
    //Sütunları Güncelle
    this.cols.splice(2,0,{
      field: name,
      header: name,
      editable: true,
      numberField: false,
      isBirim: false,
      isToplam: false
    })

    this.colNames.push(name);
    this.visible = false;

    //Satırları Güncelle
    this.dataService.addColumnToTree(this.files,name,'');

    //console.log( this.files);

  }

  addBirimCol(name: string = 'Diğer') {
    let birimName = name +' Birim Fiyat'
    let toplamName = name +' Toplam Fiyat'
    console.log(this.cols);
    this.cols.splice(this.cols.length-1,0,{
      field: birimName,
      header: birimName,
      editable: true,
      numberField: true,
      relatedField: toplamName,
      isBirim:true,
      isToplam: false
    });
    console.log(this.cols)
    this.colNames.push(birimName);

    //this.dataService.addColumnToTree(this.files,birimName,0);

    this.cols.splice(this.cols.length-1,0,{
      field: toplamName,
      header: toplamName,
      editable: false,
      numberField: true,
      isBirim: false,
      isToplam: true
    })

    this.colNames.push(toplamName);

    //this.dataService.addColumnToTree(this.files,toplamName,0);

  }

  expandAllNodes(nodes: TreeNode[]) {
    nodes.forEach(node => {
        node.expanded = true;
        if (node.children) {
            this.expandAllNodes(node.children);
        }
    });
  }

  

  onCellEdit(event: any, rowData: any, field: string) {
    let col = this.cols.find(x=>x.field == field)
    if (col) {
      //rowData[rowData.relatedField] = 12000;
      if ( col.relatedField) {      
        rowData[col.relatedField] = Number(event) * Number(rowData['Miktar']);
      }
    }
   rowData[field] = event;
   let toplamCols = this.cols.filter(x=>x.isToplam==true);
   let toplam = 0;
   if(toplamCols) {
    for (let i=0; i<toplamCols.length; i++) {
      toplam += Number(rowData[toplamCols[i].field])
    }

    rowData['Toplam'] = toplam;
   
   }
   
   console.log( field);
   //console.log(event, field, rowData, this.files)
    // Here you can handle the changed data, for example, you can send it to backend or update your data model.
  }

  

  saveDraft() {}

  updateView() { 
    this.files = [...this.files]; 
  } 
}

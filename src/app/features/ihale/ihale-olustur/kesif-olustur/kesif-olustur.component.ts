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
import { NgClass } from '@angular/common';





@Component({
  selector: 'app-kesif-olustur',
  standalone: true,
  imports: [MessagesModule, MenuModule, ToolbarModule, MultiSelectModule, 
    FormsModule, ButtonModule, TreeTableModule, InputNumberModule,
   ContextMenuModule, NgClass, InputTextModule],
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
  
  constructor(private dataService: TablodataService) {}

  ngOnInit(): void {
    // verileri yükle
    this.colNames = this.dataService.ornekData[0];
    this.cols = this.dataService.columns(this.dataService.ornekData); 
    this.selectedColumns = this.cols;
    this.files = this.dataService.convertToTreeTable(this.dataService.ornekData); 
    // menüleri oluştur

    this.rowContextItems = [
      { label: 'Alta Satır Ekle', icon: 'pi pi-arrow-down', command: (event) => this.addRowBelow() },
      { label: 'Üste Satır Ekle', icon: 'pi pi-arrow-up', command: (event) => this.addNode(this.selectedNode) },
      { label: 'Poz No Değiştir', icon: 'pi pi-file-edit', command: (event) => this.addNode(this.selectedNode) },
      { label: 'Satırı Sil', icon: 'pi pi-trash', command: (event) => this.deleteNode(this.selectedNode) }
    ];

    this.addColItems = [
    { label: 'Malzeme Birim Fiyat', icon: 'pi pi-shopping-bag', command: (event) => this.addBirimCol('Malzeme')  },
    { label: 'İşçilik Birim Fiyat', icon: 'pi pi-id-card', command: (event) => this.addBirimCol('İşçilik') },
    { label: 'Diğer Birim Fiyat', icon: 'pi pi-calculator', command: (event) => this.addBirimCol() },
    { label: 'Diğer Sütun', icon: 'pi pi-server', command: (event) => this.addOtherCol('Diğer') }
    ];


    //mesajları oluştur
    this.messages = [
      { severity: 'info', summary: 'Keşif Oluşturma', detail: 'Tablo üzerinde değişiklik yapmak için sağ tuşa tıklayarak açılan menüyü kullanabilirsiniz.' },
    ];
  }
  addRowBelow(): void {
    console.log(this.selectedNode);
    this.dataService.addRowBelow(this.files,2);
  }
  deleteNode(selectedNode: TreeNode<any>): void {
    throw new Error('Method not implemented.');
  }
  addNode(selectedNode: TreeNode<any>): void {
    throw new Error('Method not implemented.');
  }

  
  addOtherCol(name: string) {
    //Sütunları Güncelle
    this.cols.push({
      field: name,
      header: name,
      editable: true,
      numberField: false
    })

    this.colNames.push(name);

    //Satırları Güncelle
    this.dataService.addColumnToTree(this.files,name,'');

    console.log( this.files);

  }

  addBirimCol(name: string = 'Diğer') {
    let birimName = name +' Birim Fiyat'
    let toplamName = name +' Toplam Fiyat'
    this.cols.push({
      field: birimName,
      header: birimName,
      editable: true,
      numberField: true,
      relatedField: name + ' Toplam Fiyat'
    });
    this.colNames.push(birimName);

    this.dataService.addColumnToTree(this.files,birimName,0);

    this.cols.push({
      field: toplamName,
      header: toplamName,
      editable: false,
      numberField: true,
      relatedField: name + ' Birim Fiyat'
    })

    this.colNames.push(toplamName);

    this.dataService.addColumnToTree(this.files,toplamName,0);

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
    if (field.includes('Birim Fiyat')) {
      
    }
   rowData[field] = event;
   console.log(event, field, rowData, this.files)
    // Here you can handle the changed data, for example, you can send it to backend or update your data model.
  }

  getFirstPart(inputString: string, searchString: string): string {
    const index = inputString.indexOf(searchString);

    if (index !== -1) {
        return inputString.substring(0, index).trim();
    } else {
        return '';
    }
}


}

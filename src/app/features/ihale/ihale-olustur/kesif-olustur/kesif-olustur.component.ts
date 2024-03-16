import { Component, OnInit } from '@angular/core';
import { MenuItem, Message, TreeNode } from 'primeng/api';
import { TablodataService } from '../../../../services/tablodata.service';
import { Column } from '../../../../models/column.interface';





@Component({
  selector: 'app-kesif-olustur',
  standalone: true,
  imports: [],
  templateUrl: './kesif-olustur.component.html',
  styleUrl: './kesif-olustur.component.scss'
})

export class KesifOlusturComponent implements OnInit {
  
  files!: TreeNode[]; // tüm tablo
  cols!: Column[]; // tüm sütunlar

  selectedColumns!: Column[]; // görüntülenecek sütunlar

  selectedNode!: TreeNode; // sağ tuşla seçilen node

  rowContextItems!: MenuItem[]; //Tablo üzerinde sağ tuşla gelen menü
  addColItems!: MenuItem[]; //Sütun Ekle Menüsü

  messages: Message[] =[]; // bilgilendirme mesajı
  
  constructor(private dataService: TablodataService) {}

  ngOnInit(): void {
    this.cols = this.dataService.columns();  
  }
}

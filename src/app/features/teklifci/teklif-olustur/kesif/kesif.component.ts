import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { TeklifOlusturComponent } from "../teklif-olustur.component";

@Component({
    selector: 'app-kesif',
    standalone: true,
    templateUrl: './kesif.component.html',
    styleUrl: './kesif.component.scss',
    imports: [TableComponent, TeklifOlusturComponent]
})
export class KesifComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {
    
  }
}

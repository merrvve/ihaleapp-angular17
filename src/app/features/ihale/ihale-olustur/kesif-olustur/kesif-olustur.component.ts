import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { IhaleOlusturComponent } from '../ihale-olustur.component';

@Component({
  selector: 'app-kesif-olustur',
  standalone: true,
  imports: [
    TableComponent,
    IhaleOlusturComponent
  ],
  templateUrl: './kesif-olustur.component.html',
  styleUrl: './kesif-olustur.component.scss',
})
export class KesifOlusturComponent implements OnInit {
  ngOnInit(): void {
  }
}

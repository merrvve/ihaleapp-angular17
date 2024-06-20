import { Component, Input, OnInit } from '@angular/core';
import { TenderService } from '../../../services/tender.service';
import { Observable } from 'rxjs';
import { Tender } from '../../../models/tender';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ihale-ozet',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './ihale-ozet.component.html',
  styleUrl: './ihale-ozet.component.scss'
})
export class IhaleOzetComponent implements OnInit {
  @Input() tender! : Tender;
  constructor() {

  }

  ngOnInit(): void {
  }
}

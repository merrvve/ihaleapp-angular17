import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CompaniesService } from '../../../services/companies.service';
import { Company } from '../../../models/company.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-firmalar',
  standalone: true,
  imports: [TableModule, ButtonModule, AsyncPipe],
  templateUrl: './firmalar.component.html',
  styleUrl: './firmalar.component.scss',
})
export class FirmalarComponent implements OnInit {
  
  companies$! : Observable<Company[]>;
  constructor(
    private companiesService: CompaniesService,
    ) {}
  // Teklifçi bilgilerini al

  ngOnInit() {
    this.companies$ = this.companiesService.getCompanies();
    
  }

  
}

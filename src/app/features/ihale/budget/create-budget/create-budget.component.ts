import { Component, Input } from '@angular/core';
import { TableComponent } from '../../../table/table.component';
import { BudgetService } from '../../../../services/budget.service';
import { TablodataService } from '../../../../services/tablodata.service';
import { Budget } from '../../../../models/budget';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TenderService } from '../../../../services/tender.service';
import { MenuService } from '../../../../services/menu.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-budget',
  standalone: true,
  imports: [TableComponent, ButtonModule],
  templateUrl: './create-budget.component.html',
  styleUrl: './create-budget.component.scss',
})
export class CreateBudgetComponent {
  tenderId!: string | null;
  budgetData!: Budget;
  tableSubscription!: Subscription;
  constructor(
    private budgetService: BudgetService,
    private tenderService: TenderService,
    private tableService: TablodataService,
    private route: ActivatedRoute,
    private menuService: MenuService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.tenderId = params.get('id');
      if (this.tenderId) {
        this.menuService.setItems(this.tenderId);
      }
    });
    this.budgetData = this.budgetService.getCurrentBudget();
    if (!this.budgetData.discovery_data) {
      console.log('get by tender id', this.tenderId);
      if (this.tenderId) {
        this.budgetService
          .getBudgetsByTenderId(this.tenderId)
          .then((budgets) => {
            if (budgets) {
              this.budgetData = budgets[0];
              if (budgets[0].discovery_data) {
                const tableDataList = this.convertToDataList(
                  this.budgetData.discovery_data,
                );
                this.tableService.loadData(tableDataList);
              }
            } else {
              if (this.tenderId) {
                this.tenderService
                  .getTenderById(this.tenderId)
                  .subscribe((tender) => {
                    this.budgetData = {
                      tender_id: tender?.id || '',
                      discovery_data: tender?.discoveryData,
                      name: '',
                    };
                    const tableDataList = this.convertToDataList(
                      this.budgetData.discovery_data,
                    );
                    this.tableService.loadData(tableDataList);
                  });
              }
            }
          });
      }
    } else {
      const tableDataList = this.convertToDataList(
        this.budgetData.discovery_data,
      );
      this.tableService.loadData(tableDataList);
      console.log(this.budgetData, tableDataList);
    }

    //this.tableService.loadData(this.budgetData);
  }
  convertToDataList(budgetData: any) {
    let dataList = [];
    for (const row of Object.keys(budgetData)) {
      dataList.push(budgetData[row]);
    }
    return dataList;
  }

  saveBudget() {
    this.tableSubscription = this.tableService.datatree$.subscribe(
      value=> {
        this.tableService.cols$.subscribe(
          cols=> this.tableService.currentData = this.tableService.convertTreeToDatalist(value,cols)
        )
      }
    )
  

  
    let data: { [key: number]: any } = {};
    for (let i = 0; i < this.tableService.currentData.length; i++) {
      data[i] = this.tableService.currentData[i];
    }
    this.budgetData.discovery_data = data;
    if (this.budgetData.tender_id) {  
      this.budgetService.updateBudget(this.budgetData);
    } else {
      if (this.tenderId) {
        this.budgetData.tender_id = this.tenderId;
        this.budgetService.createBudget(this.budgetData);
      }
    }
  }

  ngOnDestroy() {
    this.menuService.clearItems();
    if(this.tableSubscription) {
      this.tableSubscription.unsubscribe();
    }
    
  }
}

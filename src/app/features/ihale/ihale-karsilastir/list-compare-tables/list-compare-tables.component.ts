import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-compare-tables',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './list-compare-tables.component.html',
  styleUrl: './list-compare-tables.component.scss'
})
export class ListCompareTablesComponent {
  tenderId! : string | null;
  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params=> {
        this.tenderId = params.get('id');
      })
    )
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompareTablesComponent } from './list-compare-tables.component';

describe('ListCompareTablesComponent', () => {
  let component: ListCompareTablesComponent;
  let fixture: ComponentFixture<ListCompareTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCompareTablesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCompareTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

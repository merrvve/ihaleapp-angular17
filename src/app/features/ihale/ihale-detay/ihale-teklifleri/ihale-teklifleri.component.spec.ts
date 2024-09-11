import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleTeklifleriComponent } from './ihale-teklifleri.component';

describe('IhaleTeklifleriComponent', () => {
  let component: IhaleTeklifleriComponent;
  let fixture: ComponentFixture<IhaleTeklifleriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IhaleTeklifleriComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IhaleTeklifleriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

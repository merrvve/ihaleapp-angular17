import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleOzetComponent } from './ihale-ozet.component';

describe('IhaleOzetComponent', () => {
  let component: IhaleOzetComponent;
  let fixture: ComponentFixture<IhaleOzetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IhaleOzetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IhaleOzetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

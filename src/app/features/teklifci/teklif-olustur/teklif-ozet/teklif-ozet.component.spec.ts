import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifOzetComponent } from './teklif-ozet.component';

describe('TeklifOzetComponent', () => {
  let component: TeklifOzetComponent;
  let fixture: ComponentFixture<TeklifOzetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifOzetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeklifOzetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

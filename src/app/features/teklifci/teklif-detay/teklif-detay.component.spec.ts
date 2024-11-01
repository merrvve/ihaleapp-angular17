import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifDetayComponent } from './teklif-detay.component';

describe('TeklifDetayComponent', () => {
  let component: TeklifDetayComponent;
  let fixture: ComponentFixture<TeklifDetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifDetayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeklifDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

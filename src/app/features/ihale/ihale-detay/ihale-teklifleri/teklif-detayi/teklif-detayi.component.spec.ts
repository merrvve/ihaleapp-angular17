import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifDetayiComponent } from './teklif-detayi.component';

describe('TeklifDetayiComponent', () => {
  let component: TeklifDetayiComponent;
  let fixture: ComponentFixture<TeklifDetayiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifDetayiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeklifDetayiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

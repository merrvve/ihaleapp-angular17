import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaRaporlariComponent } from './firma-raporlari.component';

describe('FirmaRaporlariComponent', () => {
  let component: FirmaRaporlariComponent;
  let fixture: ComponentFixture<FirmaRaporlariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmaRaporlariComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirmaRaporlariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

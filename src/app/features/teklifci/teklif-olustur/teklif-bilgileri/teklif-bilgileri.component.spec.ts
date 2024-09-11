import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifBilgileriComponent } from './teklif-bilgileri.component';

describe('TeklifBilgileriComponent', () => {
  let component: TeklifBilgileriComponent;
  let fixture: ComponentFixture<TeklifBilgileriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifBilgileriComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeklifBilgileriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

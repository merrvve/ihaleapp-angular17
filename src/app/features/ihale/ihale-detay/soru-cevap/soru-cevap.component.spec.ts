import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoruCevapComponent } from './soru-cevap.component';

describe('SoruCevapComponent', () => {
  let component: SoruCevapComponent;
  let fixture: ComponentFixture<SoruCevapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoruCevapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoruCevapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

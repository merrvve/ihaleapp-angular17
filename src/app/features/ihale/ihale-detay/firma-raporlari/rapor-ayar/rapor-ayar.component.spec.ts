import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaporAyarComponent } from './rapor-ayar.component';

describe('RaporAyarComponent', () => {
  let component: RaporAyarComponent;
  let fixture: ComponentFixture<RaporAyarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaporAyarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RaporAyarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

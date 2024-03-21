import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmalarComponent } from './firmalar.component';

describe('FirmalarComponent', () => {
  let component: FirmalarComponent;
  let fixture: ComponentFixture<FirmalarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmalarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirmalarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

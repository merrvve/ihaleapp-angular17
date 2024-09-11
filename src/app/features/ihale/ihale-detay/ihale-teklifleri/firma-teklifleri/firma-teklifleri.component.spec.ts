import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaTeklifleriComponent } from './firma-teklifleri.component';

describe('FirmaTeklifleriComponent', () => {
  let component: FirmaTeklifleriComponent;
  let fixture: ComponentFixture<FirmaTeklifleriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmaTeklifleriComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FirmaTeklifleriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

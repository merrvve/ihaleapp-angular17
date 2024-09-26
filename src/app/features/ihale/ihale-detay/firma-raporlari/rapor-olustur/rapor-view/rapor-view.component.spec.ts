import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaporViewComponent } from './rapor-view.component';

describe('RaporViewComponent', () => {
  let component: RaporViewComponent;
  let fixture: ComponentFixture<RaporViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaporViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaporViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

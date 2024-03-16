import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumanlarComponent } from './dokumanlar.component';

describe('DokumanlarComponent', () => {
  let component: DokumanlarComponent;
  let fixture: ComponentFixture<DokumanlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DokumanlarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DokumanlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToplantilarComponent } from './toplantilar.component';

describe('ToplantilarComponent', () => {
  let component: ToplantilarComponent;
  let fixture: ComponentFixture<ToplantilarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToplantilarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToplantilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

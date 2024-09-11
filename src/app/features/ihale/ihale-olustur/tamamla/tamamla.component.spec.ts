import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TamamlaComponent } from './tamamla.component';

describe('TamamlaComponent', () => {
  let component: TamamlaComponent;
  let fixture: ComponentFixture<TamamlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TamamlaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TamamlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

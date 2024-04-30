import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifcilerComponent } from './teklifciler.component';

describe('TeklifcilerComponent', () => {
  let component: TeklifcilerComponent;
  let fixture: ComponentFixture<TeklifcilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifcilerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeklifcilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

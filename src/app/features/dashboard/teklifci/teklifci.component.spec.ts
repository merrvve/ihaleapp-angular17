import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifciComponent } from './teklifci.component';

describe('TeklifciComponent', () => {
  let component: TeklifciComponent;
  let fixture: ComponentFixture<TeklifciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifciComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeklifciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

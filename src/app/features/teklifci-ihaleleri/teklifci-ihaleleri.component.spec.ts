import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifciIhaleleriComponent } from './teklifci-ihaleleri.component';

describe('TeklifciIhaleleriComponent', () => {
  let component: TeklifciIhaleleriComponent;
  let fixture: ComponentFixture<TeklifciIhaleleriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifciIhaleleriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeklifciIhaleleriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

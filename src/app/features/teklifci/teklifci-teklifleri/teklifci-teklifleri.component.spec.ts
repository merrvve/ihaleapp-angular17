import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifciTeklifleriComponent } from './teklifci-teklifleri.component';

describe('TeklifciTeklifleriComponent', () => {
  let component: TeklifciTeklifleriComponent;
  let fixture: ComponentFixture<TeklifciTeklifleriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifciTeklifleriComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeklifciTeklifleriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifciDetayComponent } from './teklifci-detay.component';

describe('TeklifciDetayComponent', () => {
  let component: TeklifciDetayComponent;
  let fixture: ComponentFixture<TeklifciDetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifciDetayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeklifciDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

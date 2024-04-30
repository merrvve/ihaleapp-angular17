import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifciEkleComponent } from './teklifci-ekle.component';

describe('TeklifciEkleComponent', () => {
  let component: TeklifciEkleComponent;
  let fixture: ComponentFixture<TeklifciEkleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifciEkleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeklifciEkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

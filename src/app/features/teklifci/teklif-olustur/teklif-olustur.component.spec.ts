import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifOlusturComponent } from './teklif-olustur.component';

describe('TeklifOlusturComponent', () => {
  let component: TeklifOlusturComponent;
  let fixture: ComponentFixture<TeklifOlusturComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifOlusturComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeklifOlusturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

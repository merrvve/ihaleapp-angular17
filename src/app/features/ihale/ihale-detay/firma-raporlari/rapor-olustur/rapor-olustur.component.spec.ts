import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaporOlusturComponent } from './rapor-olustur.component';

describe('RaporOlusturComponent', () => {
  let component: RaporOlusturComponent;
  let fixture: ComponentFixture<RaporOlusturComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaporOlusturComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RaporOlusturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleBilgileriComponent } from './ihale-bilgileri.component';

describe('IhaleBilgileriComponent', () => {
  let component: IhaleBilgileriComponent;
  let fixture: ComponentFixture<IhaleBilgileriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IhaleBilgileriComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IhaleBilgileriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstenenDokumanlarComponent } from './istenen-dokumanlar.component';

describe('IstenenDokumanlarComponent', () => {
  let component: IstenenDokumanlarComponent;
  let fixture: ComponentFixture<IstenenDokumanlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IstenenDokumanlarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IstenenDokumanlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

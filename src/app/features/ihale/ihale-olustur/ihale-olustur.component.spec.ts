import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleOlusturComponent } from './ihale-olustur.component';

describe('IhaleOlusturComponent', () => {
  let component: IhaleOlusturComponent;
  let fixture: ComponentFixture<IhaleOlusturComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IhaleOlusturComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IhaleOlusturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

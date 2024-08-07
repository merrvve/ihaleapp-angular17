import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleDosyalariComponent } from './ihale-dosyalari.component';

describe('IhaleDosyalariComponent', () => {
  let component: IhaleDosyalariComponent;
  let fixture: ComponentFixture<IhaleDosyalariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IhaleDosyalariComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IhaleDosyalariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

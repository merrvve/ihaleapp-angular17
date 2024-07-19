import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleKarsilastirComponent } from './ihale-karsilastir.component';

describe('IhaleKarsilastirComponent', () => {
  let component: IhaleKarsilastirComponent;
  let fixture: ComponentFixture<IhaleKarsilastirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IhaleKarsilastirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IhaleKarsilastirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

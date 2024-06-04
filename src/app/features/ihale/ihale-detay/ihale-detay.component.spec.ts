import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleDetayComponent } from './ihale-detay.component';

describe('IhaleDetayComponent', () => {
  let component: IhaleDetayComponent;
  let fixture: ComponentFixture<IhaleDetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IhaleDetayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IhaleDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

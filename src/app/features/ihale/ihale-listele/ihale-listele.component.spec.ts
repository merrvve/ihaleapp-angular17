import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleListeleComponent } from './ihale-listele.component';

describe('IhaleListeleComponent', () => {
  let component: IhaleListeleComponent;
  let fixture: ComponentFixture<IhaleListeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IhaleListeleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IhaleListeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

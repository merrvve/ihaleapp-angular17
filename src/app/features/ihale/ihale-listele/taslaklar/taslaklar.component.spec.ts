import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaslaklarComponent } from './taslaklar.component';

describe('TaslaklarComponent', () => {
  let component: TaslaklarComponent;
  let fixture: ComponentFixture<TaslaklarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaslaklarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaslaklarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YeniToplantiComponent } from './yeni-toplanti.component';

describe('YeniToplantiComponent', () => {
  let component: YeniToplantiComponent;
  let fixture: ComponentFixture<YeniToplantiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YeniToplantiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YeniToplantiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

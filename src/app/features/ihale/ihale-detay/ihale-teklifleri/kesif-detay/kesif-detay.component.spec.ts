import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KesifDetayComponent } from './kesif-detay.component';

describe('KesifDetayComponent', () => {
  let component: KesifDetayComponent;
  let fixture: ComponentFixture<KesifDetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KesifDetayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KesifDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KesifComponent } from './kesif.component';

describe('KesifComponent', () => {
  let component: KesifComponent;
  let fixture: ComponentFixture<KesifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KesifComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KesifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

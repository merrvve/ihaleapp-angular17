import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KesifOlusturComponent } from './kesif-olustur.component';

describe('KesifOlusturComponent', () => {
  let component: KesifOlusturComponent;
  let fixture: ComponentFixture<KesifOlusturComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KesifOlusturComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KesifOlusturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

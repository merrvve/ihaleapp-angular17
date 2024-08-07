import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevizyonlarComponent } from './revizyonlar.component';

describe('RevizyonlarComponent', () => {
  let component: RevizyonlarComponent;
  let fixture: ComponentFixture<RevizyonlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevizyonlarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevizyonlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

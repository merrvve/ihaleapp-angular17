import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifciEklemeComponent } from './teklifci-ekleme.component';

describe('TeklifciEklemeComponent', () => {
  let component: TeklifciEklemeComponent;
  let fixture: ComponentFixture<TeklifciEklemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifciEklemeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeklifciEklemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

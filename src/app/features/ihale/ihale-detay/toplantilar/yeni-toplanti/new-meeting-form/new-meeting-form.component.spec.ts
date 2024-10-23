import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeetingFormComponent } from './new-meeting-form.component';

describe('NewMeetingFormComponent', () => {
  let component: NewMeetingFormComponent;
  let fixture: ComponentFixture<NewMeetingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMeetingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMeetingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

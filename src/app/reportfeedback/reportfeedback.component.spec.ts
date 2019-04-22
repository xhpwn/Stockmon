import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFeedbackComponent } from './reportfeedback.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('ReportFeedbackComponent', () => {
  let component: ReportFeedbackComponent;
  let fixture: ComponentFixture<ReportFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFeedbackComponent ],
      imports: [FormsModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

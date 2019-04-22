import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportfeedbackComponent } from './reportfeedback.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('ReportfeedbackComponent', () => {
  let component: ReportfeedbackComponent;
  let fixture: ComponentFixture<ReportfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportfeedbackComponent ],
      imports: [FormsModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

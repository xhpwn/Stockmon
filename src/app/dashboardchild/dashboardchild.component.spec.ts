import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardchildComponent } from './dashboardchild.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('DashboardchildComponent', () => {
  let component: DashboardchildComponent;
  let fixture: ComponentFixture<DashboardchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardchildComponent ],
      imports : [FormsModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});

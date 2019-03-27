import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartComponent } from './piechart.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import { HttpModule } from '@angular/http';

describe('PiechartComponent', () => {
  let component: PiechartComponent;
  let fixture: ComponentFixture<PiechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiechartComponent ],
      imports: [FusionChartsModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});

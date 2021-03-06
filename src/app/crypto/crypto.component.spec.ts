import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CryptoComponent } from './crypto.component';
import { ChartComponent } from '../chart/chart.component';
import { FusionChartsModule } from 'angular-fusioncharts';

describe('CryptoComponent', () => {
  let component: CryptoComponent;
  let fixture: ComponentFixture<CryptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoComponent, ChartComponent ],
      imports: [FormsModule, HttpModule, FusionChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

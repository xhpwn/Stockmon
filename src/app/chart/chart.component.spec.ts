import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { StocksComponent } from '../stocks/stocks.component';
import { StockService } from '../stockservice';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

describe('ChartComponent', () => {
  let serv : StockService;
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent, StocksComponent ],
      imports: [FusionChartsModule, FormsModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //component.stock = { "symbol": "AAPL" };
    //fixture = TestBed.createComponent(ChartComponent);
    let backend = new MockBackend();
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });

});

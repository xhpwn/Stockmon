import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StockService } from './stockservice';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  tick,
  getTestBed,
  fakeAsync,
  ComponentFixture
} from '@angular/core/testing';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpModule, HttpClientModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'stockmon'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('stockmon');
  });


  /* StockService Tests */
  describe('StockService', () => {
    let service: StockService;
    let done: DoneFn;
    beforeEach(() => { 
      jasmine.clock().install();
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [StockService]
      });
    });
   
    it('should be created', inject([StockService], (service: StockService) => {
      expect(service).toBeTruthy();
    }));

    it('getinfocus returns a valid list', inject([StockService], (service: StockService) => {
      expect(service.getInfocus()).toBeDefined();
    }));

    it('Search test 1 (AAPL)', inject([StockService], (service: StockService) => {
      expect(service.searchBySymbol('AAPL')).toBeTruthy();
    }));

    it('Search test 2 (A)', inject([StockService], (service: StockService) => {
      expect(service.searchBySymbol('A')).toBeTruthy();
    }));

    afterEach(() => {
      jasmine.clock().uninstall();
  });
   
   /*
    it('#getPromiseValue should return value from a promise',
       (done: DoneFn) => {
      service.getPromiseValue().then(value => {
        expect(value).toBe('promise value');
        done();
      });
    });*/
  });

  /* Default tests
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to stockmon!');
  });*/
});

function awaitStream(stream$: Observable<any>, skipTime?: number) {
  let response = null;
  stream$.subscribe(data => {
    response = data;
  });
  if (skipTime) {
    /**
     * use jasmine clock to artificially manipulate time-based web apis like setTimeout and setInterval
     * we can easily refactor this and use async/await but that means that we will have to actually wait out the time needed for every delay/mock request
     */
    jasmine.clock().tick(skipTime);
  }
  console.log(JSON.parse(JSON.stringify(response["body"]["symbol"])));
  return JSON.parse(JSON.stringify(response["body"]["symbol"]));
}
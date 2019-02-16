import { Component, OnInit, Testability } from '@angular/core';
import { AuthService } from '../authservice';
import { StockService } from '../stockservice';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit {

  inFocus;
  gainers;
  losers;
  test;
  x = this.test.value;
  dataSource: Object;
  
  constructor(public stockService: StockService) { 

    this.dataSource = {
      chart: {
        "caption": "AAPL",
        "subCaption": "Last week",
        "xAxisName": "Date",
        "yAxisName": "$(USD)",
        paletteColors : "#0372AB",
        "theme": "ocean"
      },

     // "data": this.test.date;
     /* x.array.forEach(function (key,value){
        
      }
        
      });*/
      // Chart Data
      "data": [{
          "label": "Venezuela",
          "value": "290"
      }, {
          "label": "Saudi",
          "value": "260"
      }, {
          "label": "Canada",
          "value": "180"
      }, {
          "label": "Iran",
          "value": "140"
      }, {
          "label": "Russia",
          "value": "115"
      }, {
          "label": "UAE",
          "value": "100"
      }, {
          "label": "US",
          "value": "30"
      }, {
          "label": "China",
          "value": "30"
      }]
  };

  }

  ngOnInit() {
    this.stockService.getInfocus()
      .subscribe(data => {
        this.inFocus = data;
        this.inFocus = JSON.parse(this.inFocus._body);
        console.log(this.inFocus[0]);
      });
    this.stockService.getGainers()
      .subscribe(data => {
        this.gainers = data;
        this.gainers = JSON.parse(this.gainers._body);
        console.log(this.gainers[0]);
      });
    this.stockService.getLosers()
      .subscribe(data => {
        this.losers = data;
        this.losers = JSON.parse(this.losers._body);
        console.log(this.losers[0]);
      });
      this.stockService.getTest()
      .subscribe(data => {
        this.test = data;
        this.test = JSON.parse(this.test._body);
        console.log(this.test);
      });
  }
}

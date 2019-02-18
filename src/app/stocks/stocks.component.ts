import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { StockService } from '../stockservice';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit {
  selectedStock: Object;
  inFocus;
  gainers;
  losers;
  test;
  dataSource: Object;
  selectedTime = "1y";
  constructor(public stockService: StockService) { 
/*
    this.dataSource = {
      chart: {
        "caption": "Total footfall in Bakersfield Central",
        "subCaption": "Last week",
        "xAxisName": "Day",
        "yAxisName": "No. of Visitors",
        "theme": "fusion"
      },
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
    };*/

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
      this.stockService.getChartData("aapl", "1y")
      .subscribe(data => {
        this.test = data;
        this.test = JSON.parse(this.test._body);
        console.log(this.test);
});
  }

  onSelect(stock: Object):void {
    this.selectedStock = stock;
} 
 setTime(time: string):void {
  this.selectedTime = time;
}
}

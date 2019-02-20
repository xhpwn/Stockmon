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
       // console.log(this.test);
      });
      this.stockService.getChartData("aapl", "1y")
      .subscribe(data => {
        this.test = data;
        this.test = JSON.parse(this.test._body);
});
/*
this.stockService.getCurrentData("aapl","1y")
      .subscribe(data => {
        this.test = data;
        this.test = JSON.parse(this.test._body);
});*/
  }

  onSelect(stock: Object):void {
    this.selectedStock = stock;
} 


 setTime(time: string):void {
  this.selectedTime = time;
}
}

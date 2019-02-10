import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { StockService } from '../stockservice';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})

chartData = [
  { data: [330, 600, 260, 700], label: 'Account A' },
  { data: [120, 455, 100, 340], label: 'Account B' },
  { data: [45, 67, 800, 500], label: 'Account C' }
];
chartLabels = ['January', 'February', 'Mars', 'April'];
 
export class StocksComponent implements OnInit {

  inFocus;
  gainers;
  losers;
  test;

  constructor(public stockService: StockService) { }

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

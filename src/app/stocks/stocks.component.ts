import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { StockService } from '../stockservice';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  company: string

  show = 1;

  inFocus;
  gainers;
  losers;
  test;
  logoUrl

  constructor(public stockService: StockService) { }

  getLogo() {
    // console.log("inside getLogo()")
    // let comp = document.getElementById("compName").innerText
    console.log(this.company)
    this.stockService.getLogo(this.company)
      .subscribe(data => {
        this.logoUrl = data
        this.logoUrl = JSON.parse(this.logoUrl._body)
        console.log(this.logoUrl)
      })
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
  }

  showSelector(selector) {
    this.show = selector;
  }

}

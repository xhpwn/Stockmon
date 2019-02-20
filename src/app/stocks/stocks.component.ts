import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { StockService } from '../stockservice';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  show = 1;

  inFocus;
  gainers;
  losers;
  following;
  description;

  constructor(public stockService: StockService, private authService: AuthService) { }

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
      this.stockService.getFollowingList(this.authService.getUserId())
        .subscribe(data => {
          this.following = data;
        this.following = JSON.parse(this.following._body);
        console.log(this.following);
      });
    this.stockService.getDescription()
      .subscribe(data => {
        this.description = data;
        this.description = JSON.parse(this.description._body);
        console.log(this.description[0]);
      });
      this.stockService.getPrice("aapl")
        .subscribe(data => {
          console.log(data);
        });


  }

  showSelector(selector) {
    this.show = selector;
  }

}

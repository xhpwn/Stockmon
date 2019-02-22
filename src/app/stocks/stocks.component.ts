import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AuthService } from '../authservice';
import { StockService } from '../stockservice';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit {
  
  selectedStock: Object;
  oldStock:Object;
  test;
  dataSource: Object;
  selectedTime = "1y";
  week = false;
  constructor(public stockService: StockService, private authService: AuthService) { }

  show = 1;

  inFocus;
  gainers;
  losers;
  following;
  description;
  inFocusErrorMessage = "";
  gainerErrorMessage = "";
  loserErrorMessage = "";
  followingErrorMessage = "";
  descriptionErrorMessage = "";

  ngOnInit() {
    this.stockService.getInfocus()
      .subscribe(data => {
        this.inFocus = data;
        this.inFocus = JSON.parse(this.inFocus._body);
        //console.log(this.inFocus);
      });
      /*
    if (this.inFocus.length === 0) {
      this.inFocusErrorMessage = "The top-performing stocks could not be displayed.";
    }*/
    this.stockService.getGainers()
      .subscribe(data => {
        this.gainers = data;
        this.gainers = JSON.parse(this.gainers._body);
        //console.log(this.gainers);
      });
      /*
    if (this.gainers.length === 0) {
      this.gainerErrorMessage = "The stock gainers could not be displayed.";
    }*/
    this.stockService.getLosers()
      .subscribe(data => {
        this.losers = data;
        this.losers = JSON.parse(this.losers._body);
        //console.log(this.losers);
      });
      /*
    if (this.losers.length === undefined) {
      this.loserErrorMessage = "The stock losers could not be displayed.";
    }*/
      this.stockService.getFollowingList(this.authService.getUserId())
        .subscribe(data => {
          this.following = data;
        this.following = JSON.parse(this.following._body);
        if (this.following == undefined || this.following.length == 0) {
          this.following = new Array();
        }
        //console.log(this.following);
      });
      /*
      if (this.following.length === undefined) {
        this.followingErrorMessage = "You are not following anything.";
      }*/
      /*
    if (this.description.length === undefined) {
      this.descriptionErrorMessage = "The stock description could not be displayed.";
    }*/
    /*
      this.stockService.getChartData("aapl", "1y")
      .subscribe(data => {
        this.test = data;
        this.test = JSON.parse(this.test._body);
      });*/
    
    } 

      onSelect(stock: Object):void {

       if(this.selectedStock != null){
         this.oldStock = stock;
         this.selectedStock = null;
       }
       else{
        this.selectedStock = stock;
        this.oldStock = null;
       }
      
       
    } 

    setTime(time: string):void {
      if (time == "1w") {
        this.week = true;
        this.selectedTime = "1m";
      }
      else {
        this.week = false;
        this.selectedTime = time;
      }
    }

    showSelector(num) {
      this.show = num;
      console.log(this.following.length)
    }

    reloadStocks() {
      this.stockService.getFollowingList(this.authService.getUserId())
        .subscribe(data => {
          this.following = data;
        this.following = JSON.parse(this.following._body);
        if (this.following == undefined || this.following.length == 0) {
          this.following = new Array();
        }
        //console.log(this.following);
      });
      /*
      if (this.following.length === undefined) {
        this.followingErrorMessage = "You are not following anything.";
      }*/
    }

    unfollowStock(symbol: string) {
      this.stockService.removeFromFollowingList(symbol)
        .subscribe(data => {
        });
    }

}

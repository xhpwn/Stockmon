import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../stockservice';

@Component({
  selector: 'app-dashboardchild',
  templateUrl: './dashboardchild.component.html',
  styleUrls: ['./dashboardchild.component.css']
})
export class DashboardchildComponent implements OnInit {

  @Input() stock: Object;
  selected = false;
  shares;
  portfolioResponse = false;
  followingResponse = false;
  removeResponse = false;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.shares = this.stock["shares"];
  }

  onSelected() {
    this.selected = true;
  }

  updatePortfolio() {
    console.log(this.shares);
    this.stockService.updatePortfolio(this.stock["symbol"], this.shares)
    .subscribe(data => {
      this.portfolioResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
    });
  }

  addToFollowing() {
    console.log(this.stock["symbol"])
    this.stockService.addToFollowingList(this.stock["symbol"])
      .subscribe(data => {
        this.followingResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
  }

  removeFromPortfolio() {
    this.stockService.removePortfolio(this.stock["symbol"])
      .subscribe(data => {
        this.removeResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
      })
  }

}

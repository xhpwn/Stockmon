import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../stockservice';
import { CryptoService } from '../cryptoservice';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-dashboardchild',
  templateUrl: './dashboardchild.component.html',
  styleUrls: ['./dashboardchild.component.css']
})
export class DashboardchildComponent implements OnInit {

  @Input() stock: Object;
  @Input() crypto: Object;
  selected = false;
  shares;
  numCrypto;
  portfolioResponse = false;
  followingResponse = false;
  removeResponse = false;

  constructor(private stockService: StockService, private cryptService: CryptoService, private authService: AuthService) { }

  ngOnInit() {
    if (this.shares != undefined) {
    this.shares = this.stock["shares"];
    }
  }

  onSelected() {
    this.selected = true;
  }

  updatePortfolio() {
    if (this.stock != undefined) {
    this.stockService.updatePortfolio(this.stock["symbol"], this.shares)
      .subscribe(data => {
        this.portfolioResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
    }
    else {
      this.cryptService.updatePortfolio(this.authService.getUserId(), this.crypto, this.numCrypto).subscribe(data => {
        this.portfolioResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
    }
  }

  addToFollowing() {
    this.stockService.addToFollowingList(this.stock["symbol"])
      .subscribe(data => {
        this.followingResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
  }
  removeFromPortfolio() {
    if (this.stock != undefined) {
    this.stockService.removePortfolio(this.stock["symbol"])
      .subscribe(data => {
        this.removeResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
    }
    else {
      this.cryptService.removeFromPortfolio(this.authService.getUserId(), this.crypto).subscribe(data => {
        this.removeResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
    }
  }


}

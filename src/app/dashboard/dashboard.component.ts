import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ListviewComponent } from '../listview/listview.component';
import { AuthService } from '../authservice';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboardservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedStock: Object;
  oldStock: Object;

  dataSource = {
    "chart": {
      "caption": "Recommended Portfolio Split",
      "subCaption" : "For a net-worth of $1M",
      "showValues":"1",
      "showPercentInTooltip" : "0",
      "numberPrefix" : "$",
      "enableMultiSlicing":"1",
      "theme": "fusion"
    },
    "data": [{
      "label": "Equity",
      "value": "300000"
    }, {
      "label": "Debt",
      "value": "230000"
    }, {
      "label": "Bullion",
      "value": "180000"
    }, {
      "label": "Real-estate",
      "value": "270000"
    }, {
      "label": "Insurance",
      "value": "20000"
    }]
}

  
  private nameSubs: Subscription;
  private loginSubs: Subscription;
  loggedIn: boolean;
  name: String;

  inFocus;
  portfolioList;

  constructor(private authService: AuthService, public dashboardService: DashboardService) {

  }

  ngOnInit() {

    //Code from Avadhoot's merge //this.name = this.authService.getName();
    this.loginSubs = this.authService.getAuthStatusListener().subscribe(
      loggedin => {
        this.loggedIn = loggedin;
      }
    );

    this.nameSubs = this.authService.getNameListener().subscribe(
      obsname => {
        this.name = obsname;
      });

    this.dashboardService.getPortfolio(this.authService.getUserId())
      .subscribe(data => {
        // console.log(data)
        this.portfolioList = data;
        this.portfolioList = JSON.parse(this.portfolioList._body);
        console.log(this.portfolioList[0]);
      });
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
}

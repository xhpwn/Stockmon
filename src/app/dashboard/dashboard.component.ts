import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ListviewComponent } from '../listview/listview.component';
import { AuthService } from '../authservice';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboardservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private nameSubs: Subscription;
  private loginSubs: Subscription;
  loggedIn: boolean;
  name: String;

  inFocus;
  portfolioList;

  constructor(private authService: AuthService, public dashboardService: DashboardService) {
  }

  ngOnInit() {

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
}


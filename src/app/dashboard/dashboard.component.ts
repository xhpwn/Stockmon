import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ListviewComponent } from '../listview/listview.component';
import { AuthService } from '../authservice';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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

  name: string;

  constructor(private authService : AuthService) {
    let loggedin : boolean = true;
    let data : String[] = ['Apple', 'Microsoft'];
   }

  ngOnInit() {
    this.name = this.authService.getName();


  }

}


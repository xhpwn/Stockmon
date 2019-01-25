import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ListviewComponent } from '../listview/listview.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

  constructor() {
    let loggedin : boolean = true;
    let data : String[] = ['Apple', 'Microsoft'];
   }

  ngOnInit() {
  }

}


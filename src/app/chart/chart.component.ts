import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../stockservice';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() stock: Object;
  @Input() time: string;

  dataSource;
  test;

  constructor(public stockService: StockService) {    
    console.log(this.time);
  }

  ngOnInit() {
   // console.log(this.stock);
  }

  createChart(){

    this.test = this.stockService.getData(this.stock.symbol, this.time)
    .subscribe(data => {
      this.test = data;
      this.test = JSON.parse(this.test._body);
      console.log(this.test);
    });

    this.dataSource = {
      chart: {
        "caption": "Stock data for",
        "subCaption": "Last week",
        "xAxisName": "Day",
        "yAxisName": "No. of Visitors",
        "theme": "fusion"
      },
      // Chart Data
      "data": this.test
  };
  }
  
}

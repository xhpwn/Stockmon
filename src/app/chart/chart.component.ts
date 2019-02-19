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
  newData = new Array();
  counter = 0;


  constructor(public stockService: StockService) {    
  console.log(this.time);
  }

  ngOnInit() {

   this.stockService.getChartData(this.stock["symbol"].toString(), this.time)
   .subscribe(data => {
     this.test = data;
     this.test = JSON.parse(this.test._body);
    // console.log(this.test);   

     this.test.forEach(element => {
      let temp = {
        "label": element.label, "value": element.value.toString()
      }

      if(this.time == "1m"){
        if(this.counter % 2 ==0 ){         // <------------------------ Change 1m skips
          this.newData.push(temp)
        }
        this.counter++;
      }

      if(this.time == "1y"){
      if(this.counter % 23 ==0 ){         // <------------------------ Change 1y skips
        this.newData.push(temp)
      }
      this.counter++;
    }


    if(this.time == "5y"){
      if(this.counter % 200 ==0 ){        // <------------------------ Change 5y skips
        this.newData.push(temp)
      }
      this.counter++;
    }

/*
this.flag20 = element.label.includes('-20');

      if(this.flag20 == 0 && element.label.includes('-19')){
        this.newData.push(temp)
        this.flag20 = 1;
      }
       if(this.flag20 == 0  && element.label.includes('-20')){
      this.newData.push(temp)
      this.flag20 = 1;
      }
      if(this.flag20 == 0 && element.label.includes('-21')){
      this.newData.push(temp)
      this.flag20 = 1;
      }
 */
  //   this.flag20 = 0;
  
    });
   });

   console.log("MMMM");    

   this.dataSource = {
     chart: {
       "caption": "Stock data for " +this.stock["symbol"].toString(),
       "subCaption": " " + this.time,
       "xAxisName": "Time",
       "yAxisName": "$(USD)",
       "lineColor": "#346474",
       "bgcolor": "white",
       "showAlternateHGridColor": 0,
       "numberPrefix": "$",
       "theme": "gammel"
     },
     // Chart Data

     "data": this.newData
  
 };
}

}

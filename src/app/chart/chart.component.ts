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
  flag20;
  flag21;
  flag22;
  cooldown = 4;


  constructor(public stockService: StockService) {    
  console.log(this.time);
  }

  ngOnInit() {
   this.stockService.getChartData("cron", "1y")
   .subscribe(data => {
     this.test = data;
     this.test = JSON.parse(this.test._body);
    // console.log(this.test);   

     this.test.forEach(element => {
      let temp = {
        "label": element.label, "value": element.value.toString()
      }
      if(this.counter % 23 ==0 ){
        this.newData.push(temp)
      }
      this.counter++;
/*
this.flag20 = element.label.includes('-20');
this.flag21 = element.label.includes('-21');
this.flag22 = element.label.includes('-22');

console.log(this.flag20);
      
      if(this.flag20){
        this.newData.push(temp)
        this.cooldown == 4;
      }

      if(this.flag21){
        if(this.cooldown < 0)
        {
        this.newData.push(temp)
        this.cooldown == 4;
      }
    }

    if(this.flag22){
      if(this.cooldown < 0)
      {
      this.newData.push(temp)
      this.cooldown == 4;
    }
  }

this.cooldown--;
      /*
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
       "caption": "Stock data for cron" ,
       "subCaption": " " + this.time,
       "xAxisName": "Time",
       "yAxisName": "$(USD)",
       "theme": "gammel"
     },
     // Chart Data

     "data": this.newData
 /*
      { label: "2018-02-20", value: 7.4145 },{ label: "2018-02-21", value: 7.18 },​​
      { label: "2018-02-22", value: 7.2023 },​​{ label: "2018-02-23", value: 7.0113 },
      { label: "2018-02-26", value: 7.7602 },​​{ label: "2018-02-27", value: 7.62 },​​
      { label: "2018-02-28", value: 9.17 },​​{ label: "2018-03-01", value: 9.69 },​​
      { label: "2018-03-02", value: 9.4 }, {label: "2018-03-05", value: 9.77 }
     
    }*/    
 };
}

}

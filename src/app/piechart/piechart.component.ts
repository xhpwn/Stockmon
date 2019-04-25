import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../dashboardservice';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  dataSource;
  data;
  cdata;
  eee;
  fff;
  piedata = new Array();
  @Input() list:Object[];
  constructor(private dashboardService: DashboardService) {}

  portfolioHandler(){
    this.dashboardService.getPortfolio(localStorage.getItem("userId")
).subscribe(
    res => {
        this.data = res;
        this.data = JSON.parse(this.data._body);
        this.eee = this.data;
        return this.data;
    }
)
  }

  portfolioHandler2(){
    this.dashboardService.getCryptPortfolio(localStorage.getItem("userId")
).subscribe(
    res => {
        this.cdata = res;
        this.cdata = JSON.parse(this.cdata._body);
        this.fff = this.cdata;
       // console.log("!!!!")

        return this.cdata;
    }
)
  }
  

  ngOnInit() {
  this.eee = this.portfolioHandler();
  this.fff = this.portfolioHandler2();

  setTimeout(()=> this.loadChart(),1000);
 
  }


loadChart(){

    this.eee.forEach(element => {
        let temp = {
          "label": element.symbol, "value": element.equity
        }
        this.piedata.push(temp)
    });

  this.fff.forEach(element => {
    console.log("!!!!")

      let temp = {
        "label": element.symbol, "value": element.totAmount
      }

      this.piedata.push(temp)
  });


//this.piedata.push({"label":"ETH", "value": 141.63})
    
    this.dataSource = {
    
    
      "chart": {
        "caption": localStorage.getItem("name") + "'s portfolio",
        "subCaption": "Stocks",
        "use3DLighting": "0",
        "showPercentValues": "1",
        "decimals": "2",
        "useDataPlotColorForLabels": "1",
        "theme": "fusion"
    },
    "data":this.piedata
    };
}

}

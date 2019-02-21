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
  eee;
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

  ngOnInit() {
  this.eee = this.portfolioHandler();
 setTimeout(()=> this.loadChart(),500);
 console.log(this.eee);



  }
loadChart(){

    this.eee.forEach(element => {
        let temp = {
          "label": element.symbol, "value": element.equity
        }
        this.piedata.push(temp)
    });
    
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

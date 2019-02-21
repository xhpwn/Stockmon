import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  dataSource;
  userStockNames;
  userStockValues;


  constructor() { }

  ngOnInit() {

this.dataSource = {

  "chart": {
    "caption": "$USER'S portfolio",
    "subCaption": "Stocks",
    "use3DLighting": "0",
    "showPercentValues": "1",
    "decimals": "2",
    "useDataPlotColorForLabels": "1",
    "theme": "fusion"
},
"data": [
    {
        "label": "AMZN",
        "value": "1250400"
    },
    {
        "label": "AAPL",
        "value": "1463300"
    },
    {
        "label": "FB",
        "value": "1050700"
    },
    {
        "label": "LEE",
        "value": "491000"
    },
    {
        "label": "XXX",
        "value": "42000"
    }
]
}

;

  }

}

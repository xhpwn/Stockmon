import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  dataSource;
  constructor() { }

  ngOnInit() {

this.dataSource = {

  "chart": {
    "caption": "Split of Visitors by Age Group",
    "subCaption": "Last year",
    "use3DLighting": "0",
    "showPercentValues": "1",
    "decimals": "1",
    "useDataPlotColorForLabels": "1",
    "theme": "fusion"
},
"data": [
    {
        "label": "Teenage",
        "value": "1250400"
    },
    {
        "label": "Adult",
        "value": "1463300"
    },
    {
        "label": "Mid-age",
        "value": "1050700"
    },
    {
        "label": "Senior",
        "value": "491000"
    }
]
}

;

  }

}

import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../dashboardservice';

@Component({
  selector: 'app-forexchild',
  templateUrl: './forexchild.component.html',
  styleUrls: ['./forexchild.component.css']
})
export class ForexchildComponent implements OnInit {

  @Input() defaultC: Object;
  @Input() currency: Object;
  @Input() name: Object;

  ready = false;

  converted;
  format;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.format = this.currency + "_" + this.defaultC;
    this.dashboardService.convert(this.defaultC, this.currency).subscribe(
      res => {
        this.converted = JSON.parse(JSON.stringify(res["_body"]));
        this.converted = JSON.parse(this.converted);
        this.converted = this.converted[this.format].val.toFixed(2);
      }, (err) => console.log(err),
      () => { this.ready = true});
  }

}

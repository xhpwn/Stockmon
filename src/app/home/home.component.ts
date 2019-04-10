import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  n =  new Date();
  dayofWeek = this.n.getDay(); // 0 -6 0 = SUnday 1 = Monday 2 = Tuesday...
  hourofDay = this.n.getHours(); // 24 hour format
  marketStatus = "open";

  constructor() { }

  ngOnInit() {
    console.log(this.dayofWeek);

    if((this.dayofWeek == 0 && this.hourofDay < 17) || (this.dayofWeek == 5 && this.hourofDay >= 16) || (this.dayofWeek == 6)){
      this.marketStatus == "closed";
    }
  }
  
}



